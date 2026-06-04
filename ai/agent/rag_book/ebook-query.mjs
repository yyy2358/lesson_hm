//跟向量数据库 搜索循环
import 'dotenv/config';
import {
    MilvusClient,
    DataType,
    IndexType,
    MetricType,
} from '@zilliz/milvus2-sdk-node';
import {
    OpenAIEmbeddings,
} from '@langchain/openai';

const ADDRESS = process.env.MILVUS_ADDRESS;
const TOKEN = process.env.MILVUS_TOKEN;
const COLLECTION_NAME = 'ebook';
const VECTION_DIM = 1024;

const embeddings = new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.EMBEDDING_MODEL_NAME,
    configuration:{
        baseURL: process.env.OPENAI_BASE_URL,
    },
    dimensions: VECTION_DIM,
})

const client = new MilvusClient({
    address: ADDRESS,
    token: TOKEN,
})

async function getEmbedding(text) {
    const result = await embeddings.embedQuery(text);
    return result;
}

async function main() {
    try {
        console.log('Connection to Milvus...')
        await client.connectPromise;
        try {
            await client.loadCollection({
                collectionName: COLLECTION_NAME,
            })
        } catch(err) {
            console.log('Collection already loaded');
        }//连接 加载集合
        const query = '段誉会什么武功？';
        const queryVector = await getEmbedding(query);
        const searchResult = await client.search({
            collection_name: COLLECTION_NAME,
            vector: queryVector,
            limit: 3,
            metric_type: MetricType.COSINE,
            //指定查完后返回哪些字段
            output_fields: ['id','content','book_id','chapter_num','index','book_name'],
        })
        searchResult.results.forEach((item,index) => {
            console.log(`\n 第${index+1}条结果: Score: ${item.score.toFixed(2)}`);//相似度通过得分权衡 保留两位小数-1到1
            console.log(`ID: ${item.id}`)
            console.log(`Content: ${item.content}`)
            console.log(`Book ID: ${item.book_id}`)
            console.log(`Chapter Number: ${item.chapter_num}`)
            console.log(`Index: ${item.index}`)
            console.log(`Book Name: ${item.book_name}`)
        })
    } catch(err) {
        console.log('Connection to Milvus failed:', err.Message);
    }//容易出错的地方就try catch 后端要稳定
}
main()