import 'dotenv/config';
import { parse } from 'path';//解析文件
import {
    MilvusClient,
    DataType,
    IndexType,
    MetricType,
} from '@zilliz/milvus2-sdk-node';
import {
    OpenAIEmbeddings,
} from '@langchain/openai';
import {
    EPubLoader
} from '@langchain/community/document_loaders/fs/epub';
import {
    RecursiveCharacterTextSplitter,
} from '@langchain/textsplitters';

const COLLECTION_NAME = 'ebook';
const VECTION_DIM = 1024;
const CHUNK_SIZE = 500;
const EPUB_FILE = './天龙八部.epub';
const CHUNK_OVERLAP = 50;

const ADDRESS = process.env.MILVUS_ADDRESS;
const TOKEN = process.env.MILVUS_TOKEN;

const BOOK_NAME = parse(EPUB_FILE).name;
console.log(BOOK_NAME);

const embeddings  = new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.EMBEDDING_MODEL_NAME,
    configuration: {
        baseURL: process.env.OPENAI_BASE_URL,
    },
    dimensions: VECTION_DIM,
});

const client = new MilvusClient({
    address: ADDRESS,
    token: TOKEN,
});

async function getEmbedding(text) {
    const result = await embeddings.embedQuery(text);
    return result;
}//生产embedding向量的函数

async function ensureBookCollection(bookId) {
    try {
        const hasCollection = await client.hasCollection({
            collection_name: COLLECTION_NAME,
        })
        console.log('判断集合是否存在:', hasCollection);
        //为什么要加value
        if (!hasCollection.value) {
            console.log(`${COLLECTION_NAME}集合不存在，创建集合`);
            await client.createCollection({
                collection_name: COLLECTION_NAME,
                //schema
                fields: [
                    { name: 'id',data_type: DataType.VarChar, max_length: 100,is_primary_key: true},
                    { name: 'book_id', data_type: DataType.VarChar,max_length: 100},
                    { name: 'book_name', data_type: DataType.VarChar,max_length: 100},
                    { name: 'chapter_num',data_type: DataType.Int32},
                    { name: 'index',data_type: DataType.Int32},
                    { name: 'content',data_type: DataType.VarChar,max_length: 10000},
                    { name: 'vector',data_type: DataType.FloatVector, dim: VECTION_DIM},
                ]
            });
            console.log('集合创建成功');
            await client.createIndex({
                collection_name: COLLECTION_NAME,
                field_name: 'vector',
                index_type: IndexType.IVF_FLAT,
                metric_type: MetricType.COSINE,
                params: {
                    nlist: VECTION_DIM,
                }
            });
            console.log('索引创建成功');
        }
        //集合已经存在的话 还要加载文档
        try {
            await client.loadCollection({
                collection_name: COLLECTION_NAME,
            });
            console.log('集合加载成功');
        } catch (err) {
            console.error('集合已处于加载状态');
        }
    } catch (err) {
        console.error('创建集合失败:', err.message);
        throw err;
    }
}

async function loadAndProcessEPubStreaming(bookId) {
    try {
        console.log('开始加载EPUB 文件');
        const loader = new EPubLoader(
            EPUB_FILE,
            {
                splitChapters: true,//这个api的意思是是否将epub文件按章节拆分成多个独立的文档片段
            }
        )//加载epub文件时 先按照章节拆分  每个章节都作为文档加载文档  
        const documents = await loader.load();
        console.log(documents);
//将文档拆分成多个片段 来个循环
        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: CHUNK_SIZE,
            chunkOverlap: CHUNK_OVERLAP,
            //没有给separator 就默认是\n\n 分割  段落的换行  \n 就是换行符  再用。， 啥的
        });
        let totalInserted = 0;//总共拆了拆了多少个片段 
        for (let chapterIndex = 0; chapterIndex < documents.length; chapterIndex++) {
            const chapter = documents[chapterIndex];
            const chapterContent = chapter.pageContent;
            console.log(`处理第 ${chapterIndex + 1}/${documents.length} 章`);
            const chunks = await textSplitter.splitText(chapterContent);
            console.log(`拆分为 ${chunks.length} 个片段`);
            if (chunks.length === 0) {
                console.log(`跳过空章节\n `);
                continue;
            }
            console.log('生成向量并插入中...');//接下来调用getEmbedding函数 插入到数据库  这里都是切割加载的逻辑 其他的不写这里
            const insertedCount = await insertChunksBatch(chunks, bookId, chapterIndex + 1);
            totalInserted += insertedCount;
            console.log(`插入成功${insertedCount}个片段，累计插入  ${totalInserted} 个片段`);
        } 
        console.log(`\n 处理完成 总插入 ${totalInserted} 个片段`);
         return totalInserted;
    } catch(err) {
        console.error('加载EPUB 文件失败:', err.message);
        throw err;
    }
}//函数别超过十行代码

async function insertChunksBatch(chunks, bookId, chapterNum) {
    try {
        if (chunks.length === 0) {
            return 0;
        }
        //性能优化 jsx虚拟DOM 不要用DOM编程 用promise.all代替for循环   embedding 并发
        //返回结果是符合schema 的数组 可以进行insert操作
        const insertData = await Promise.all(
            chunks.map(async (chunk, chunkIndex) => {//async函数就是一个promise 执行结果就是返回一个promise
                //所以就可以交给promise.all并发执行 chunk.map将我们原来切割的每个小块变成另外一个数组  每个小块都调用getEmbedding函数  并发执行
                //返回的是符合schema的格式的数据集合
                const vector = await getEmbedding(chunk);
                return {
                    id: `${bookId}-${chapterNum}-${chunkIndex}`,
                    book_id: bookId,
                    book_name: BOOK_NAME,
                    chapter_num: chapterNum,
                    index: chunkIndex,
                    content: chunk,
                    vector: vector,
                };
            })
        )//同时并发执行  每个循环的getEmbedding函数  每一个chunk的embedding向量变成一个promise 组成promise.all
        const insertResult = await client.insert({
            collection_name: COLLECTION_NAME,
            data: insertData,
        });
        return Number(insertResult.insert_cnt) || 0;
    } catch (err) {
        console.error('插入片段失败:', err.message);
        throw err;
    }
}

async function main() {
    try{
        console.log('电子书处理');
        console.log('连接milvus');
        await client.connectPromise;
        console.log('连接成功');
//可以加check health
        const bookId = 1;
        await ensureBookCollection(bookId);
        await loadAndProcessEPubStreaming(bookId);//流式处理 文件的内容 
    } catch (err) {
        console.error('主函数失败:', err.message);
        throw err;
    }
}

main();
//按章节进行加载 再按照默认的splitters 分割 
//面试的时候问你对异步 await async  promise  可以举这个例子rag的认识 对splitter的理解肯定是完胜的
//连接数据库 确保有集合 然后加载集合 再切割  然后插入片段 并发的准备要插入的数据 每一个都是schema对象的数组
//连接数据库 建表 加载 切割 promise.all
