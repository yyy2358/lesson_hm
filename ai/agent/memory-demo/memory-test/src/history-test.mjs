import { config } from 'dotenv';
config({ path : path.join(process.cwd(),".env")});
import path from 'node:path';
import {
    ChatOpenAI
} from '@langchain/openai';
import {
    InMemoryChatMessageHistory
} from '@langchain/core/chat_history';
import {
    SystemMessage,
    HumanMessage
} from '@langchain/core/messages';
const model = new ChatOpenAI({
    temperature: 0,
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.MODEL_NAME,
    configuration:{
        baseURL: process.env.OPENAI_BASE_URL,
    },
})

async function inMemoryDemo() {
    const history = new InMemoryChatMessageHistory();//内存聊天历史管理  截断 总结
    const systemMessage = new SystemMessage(
        "你是一个友好、幽默的做菜助手，喜欢分享美食和烹饪技巧。"
    );
    console.log('[第一轮对话]');
    const userMessage1 = new HumanMessage(
        "你今天吃的什么？。"
    );
    await history.addMessage(userMessage1);
    const message1 = [systemMessage, ...(await history.getMessages())];//这个api可以拿到历史里面所有的message
    const response1 = await model.invoke(message1);
    await history.addMessage(response1);
    console.log(`用户：${userMessage1.content}`)
    console.log(`助手：${response1.content}`)
}

inMemoryDemo()
    .catch(console.error)