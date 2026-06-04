import { 
    DataType,
    IndexType,
    MetricType,
    MilvusClient,
    } from '@zilliz/milvus2-sdk-node';
import 'dotenv/config';
import {
    OpenAIEmbeddings
} from '@langchain/openai'

const VECTOR_DIM = 1024;//openai 向量维度
const COLLECTION_NAME = 'ai_diary';

const TOKEN = process.env.MILVUS_TOKEN;
const ADDRESS = process.env.MILVUS_ADDRESS;

const embeddings = new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.EMBEDDING_MODEL_NAME,
    configuration: {
        baseURL: process.env.OPENAI_BASE_URL,
    },
    dimensions: VECTOR_DIM,
});
const client = new MilvusClient({
       address: ADDRESS,
       token: TOKEN,
    });
// 嵌入模型，将文本转换为向量的函数封装
async function getEmbeddings(text) {
    const result = await embeddings.embedQuery(text);
    return result;
}

async function main() {
   
    console.log('正在连接Milvus...');

    const checkHealth = await client.checkHealth();
    if (!checkHealth.isHealthy) {
        console.error('Milvus连接失败:', checkHealth.reasons);
        return;
    }
    console.log('Milvus连接成功，集群状态正常...');
     await client.loadCollection({
        collection_name: COLLECTION_NAME,
    })

    const query = '我想看看关于户外活动的日记';
    const queryVector = await getEmbeddings(query);
    const searchResult = await client.search({
        collection_name: COLLECTION_NAME,
        vector: queryVector,
        limit: 3,
        metric_type: MetricType.COSINE,
        output_fields: ['id','content','date','mood','tags'],
         })
         searchResult.results.forEach(result => {
        console.log(`\n 日记ID: ${result.id}`);
        console.log(`内容: ${result.content}`);
        console.log(`日期: ${result.date}`);
        console.log(`心情: ${result.mood}`);
        console.log(`标签: ${result.tags}`);
    })
    console.log('\n 搜索结果:');
    console.log(`共找到 ${searchResult.results.length} 条相关日记`);//因为语义相似度最高 所以003在最上面
/* 
    //创建集合 建表
    await client.createCollection({
        collection_name: COLLECTION_NAME,
        fields: [
            {
                name:'id',
                data_type:DataType.VarChar,
                max_length:50,
                is_primary_key:true
            },
            {
                name:'vector',
                data_type:DataType.FloatVector,
                dim:VECTOR_DIM,
            },
            {
                name:'content',
                data_type:DataType.VarChar,
                max_length:5000,
            },
            {
                name: 'date',
                data_type: DataType.VarChar,
                max_length: 50,
            },
            {
                name: 'mood',
                data_type: DataType.VarChar,
                max_length: 50,
            },
            {
                name: 'tags',
                data_type: DataType.Array,
                element_type: DataType.VarChar,
                max_capacity: 10,
                max_length: 50,
            },
        ]
    })
   console.log('集合创建成功');
    await client.createIndex({
        collection_name: COLLECTION_NAME,
        field_name: 'vector',//常用的查询字段   是单数
        index_type: IndexType.IVF_FLAT,//IVF不要写错了 会导致索引创建失败
        metric_type:MetricType.COSINE,
        params: {
            nlist: VECTOR_DIM,
        },
    })
        // 插入数据
    console.log('正在加载集合...');
    await client.loadCollection({
        collection_name: COLLECTION_NAME,
    })
    console.log('\nInserting diary entries...');
   const diaryContents = [
            {
            id: 'diary_001',
            content: '今天天气很好，去公园散步了，心情愉快。看到了很多花开了，春天真美好。',
            date: '2026-01-10',
            mood: 'happy',
            tags: ['生活', '散步']
            },
            {
            id: 'diary_002',
            content: '今天工作很忙，完成了一个重要的项目里程碑。团队合作很愉快，感觉很有成就感。',
            date: '2026-01-11',
            mood: 'excited',
            tags: ['工作', '成就']
            },
            {
            id: 'diary_003',
            content: '周末和朋友去爬山，天气很好，心情也很放松。享受大自然的感觉真好。',
            date: '2026-01-12',
            mood: 'relaxed',
            tags: ['户外', '朋友']
            },
            {
            id: 'diary_004',
            content: '今天学习了 Milvus 向量数据库，感觉很有意思。向量搜索技术真的很强大。',
            date: '2026-01-12',
            mood: 'curious',
            tags: ['学习', '技术']
            },
            {
            id: 'diary_005',
            content: '晚上做了一顿丰盛的晚餐，尝试了新菜谱。家人都说很好吃，很有成就感。',
            date: '2026-01-13',
            mood: 'proud',
            tags: ['美食', '家庭']
            }
        ];

    console.log('Generating embeddings...');

    //Promise.all：并行执行所有任务，并等待全部完成，返回最终数组
    //map：遍历数组，给每篇日记创建异步任务（生成向量）
    const diaryData = await Promise.all(
        diaryContents.map(async (diary) => ({
            ...diary,
            vector: await getEmbeddings(diary.content),
        }))
    );
    const inserRes = await client.insert({
        collection_name: COLLECTION_NAME,
        data: diaryData,
    })
    console.log(`插入成功: ${inserRes.insert_cnt} 条数据`);
    */
}
main();