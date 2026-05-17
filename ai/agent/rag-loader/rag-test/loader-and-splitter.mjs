import "dotenv/config";
import "cheerio";//让我们在后端使用css选择器 像操作前端一样查找DOM节点
import { CheerioWebBaseLoader } from 
    "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";//递归字符文本分割器
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";

const cheerioLoader = new CheerioWebBaseLoader(
    "https://juejin.cn/post/7233327509919547452?searchId=2026051714053557ABC31B60A2D757659B",
    {
        selector: '.main-area p'
    }
)
const documents = await cheerioLoader.load();//执行加载、根据你写的 selector 抓取网页正文，最终返回给你干净的文档数组（给 RAG 用）
// console.log(documents);
const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 400,//大小
    chunkOverlap: 50,//重叠   允许两个chunk之间有50个字符重叠  语义的连贯性
    separators: ['。', '，', '！', '？']//分割符   注意中英文符号切换
});

const splitDocuments = await textSplitter.splitDocuments(documents);
console.log(splitDocuments);
console.log(`文档分割完成，共${splitDocuments.length}个片段`);

const model = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.MODEL_NAME,
    configuration: { baseURL: process.env.OPENAI_BASE_URL },
});
// 向量存储需要 embeddings 模型把文本转成向量，必须传入
const embeddings = new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.EMBEDDING_MODEL_NAME,
    configuration: { baseURL: process.env.OPENAI_BASE_URL },
});

console.log("正在创建向量数据库... ");
const vectorStore = await MemoryVectorStore.fromDocuments(
    splitDocuments,
    embeddings,
);
console.log("向量数据库创建完成");

const retriever = await vectorStore.asRetriever({
    k: 2,
});

const questions = ["父亲的去世对作者的人生态度产生了怎样的根本性逆转？"];

for (const question of questions) {
    console.log("=".repeat(80));
    console.log(question);
    console.log("=".repeat(80));
//先对question进行embedding 然后再通过embedding结果的向量跟内存中的向量数据库进行相似度计算
    const retrievedDocs = await retriever.invoke(question);
    const scoreResults = await vectorStore.similaritySearchWithScore(question, 2);
    console.log(scoreResults);

   console.log("\n [检索到的文档及相识度评分]");
    retrievedDocs.forEach((doc, i) => {
        const scoreResult = scoreResults.find(
            ([scoredDoc]) => scoredDoc.pageContent === doc.pageContent
        );
       const score = scoreResult ? scoreResult[1] : null;
       const similarity = score ? (1 - score).toFixed(2) : "N/A";

       console.log(`\n 文档${i+1} 相似度: ${similarity}`);;
       console.log(`内容: ${doc.pageContent}`);
       if (doc.metadata && Object.keys(doc.metadata).length > 0) {
        console.log(`元数据: ${JSON.stringify(doc.metadata)}`);
       }
    });
    //增强
    const content = retrievedDocs
    .map((doc,i) => `[片段${i+1}\n ${doc.pageContent}`)//拿到文档变成字符串
    .join("\n\n----\n\n");

    const prompt = `你是一个文章辅助阅读助手，根据文章内容来解答：
    文章内容：
    ${content}

    问题：
    ${question}
    回答：
    `
    console.log("\n [AI 回答]");
    const response = await model.invoke(prompt);
    console.log(response.content);
}