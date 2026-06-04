import { config } from 'dotenv';
config({ path : path.join(process.cwd(),".env")});
import {
    ChatOpenAI
} from '@langchain/openai';
import {
    FileSystemChatMessageHistory
} from '@langchain/community/stores/message/file_system';
import {
    SystemMessage,
    HumanMessage,
    AIMessage
} from '@langchain/core/messages';
import path from 'node:path';

const model = new ChatOpenAI({
    temperature:0,
    modelName: process.env.MODEL_NAME,
    apiKey: process.env.OPENAI_API_KEY,
    configuration:{
        baseURL: process.env.OPENAI_BASE_URL,
    }
})

async function fileHistoryDemo() {
    const filePath = path.join(process.cwd(),"chat-history.json")//进程运行出的目录
    const sessionId = "user_session_001";//新一轮会话的会话id 让无状态的大模型记住用户的对话历史 
    //相当于Web网站的Cookie 让无状态的 HTTP 记住用户是谁
    const systemMessage = new SystemMessage(
        "你是一个友好的做菜助手，喜欢分享美食和烹饪技巧。"
    )
    console.log("[第一轮对话]");
    const history = new FileSystemChatMessageHistory(
        filePath,
        sessionId,
    )//chatbot messages session 的理解
    const userMessage1 = new HumanMessage(
        "红烧肉怎么做？"
    );
    await history.addMessage(userMessage1);
    const message1 = [systemMessage,...(await history.getMessages())];
    console.log(message1)
    const response1 = await model.invoke(message1);
    console.log(response1);
    await history.addMessage(response1);
    console.log(await history.getMessages());

    const userMessage2 = new HumanMessage(
        "好吃吗？"
    );
    await history.addMessage(userMessage2);
    //发送到大模型之前 从history中获取所有消息
    const message2 = [systemMessage,...(await history.getMessages())];
    const response2 = await model.invoke(message2);
    await history.addMessage(response2);
    console.log(response2);
    console.log(await history.getMessages());

    

}

fileHistoryDemo().catch(console.error);//async是一个promise 用catch捕获错误