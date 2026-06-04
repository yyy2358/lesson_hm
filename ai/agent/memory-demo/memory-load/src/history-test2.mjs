//加载memory 
import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';
import { FileSystemChatMessageHistory } from "@langchain/community/stores/message/file_system";
import { HumanMessage, AIMessage, SystemMessage } from "@langchain/core/messages";
import path from "node:path";

const model = new ChatOpenAI({ 
  modelName: process.env.MODEL_NAME,
  apiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
  configuration: {
      baseURL: process.env.OPENAI_BASE_URL,
  },
});

async function fileHistoryDemo() {
    const filePath = path.join(process.cwd(), "chat_history.json");
    const sessionId = "user_session_001";

    const systemMessage = new SystemMessage(
        "你是一个友好的做菜助手，喜欢分享美食和烹饪技巧。"
    );
    const restoredHistory = new FileSystemChatMessageHistory({
        filePath: filePath,
        sessionId: sessionId,
    });
    // console.log(await restoredHistory.getMessages());

    console.log("[第三轮对话]");
    const userMessage3 = new HumanMessage(
        "需要哪些食材？"
    )
    await restoredHistory.addMessage(userMessage3);//添加的message怎么跟大模型交流 添加到历史中 再把它解构出来
    const messages3 = [systemMessage,...(await restoredHistory.getMessages())];
    const response3 = await model.invoke(messages3);
    await restoredHistory.addMessage(response3);

    console.log(`用户: ${userMessage3.content}`);
    console.log(`助手: ${response3.content}`);
    console.log(`✓ 对话已保存到文件: ${filePath}\n`);

}
fileHistoryDemo()
.catch(console.error);
