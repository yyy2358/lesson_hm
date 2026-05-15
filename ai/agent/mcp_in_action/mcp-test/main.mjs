import 'dotenv/config';
import chalk from 'chalk';
import { ChatOpenAI } from '@langchain/openai';
import { MultiServerMCPClient } from '@langchain/mcp-adapters';
import {
    HumanMessage,
    SystemMessage,
    ToolMessage
}from '@langchain/core/messages';

const model = new ChatOpenAI({
    modelName:process.env.MODEL_NAME,
    apiKey:process.env.OPENAI_API_KEY,
    configuration: {
        baseURL: process.env.OPENAI_BASE_URL,
    },
});

const mcpClient = new MultiServerMCPClient({
    //动态实时更新的
    mcpServers: 
        {
           "amap-maps": {
           url: `https://mcp.amap.com/mcp?key=${process.env.AMAP_API_KEY}`
    },
    //mcp 官方提供  有第三方提供就不用写  不是动态的 自己安装包到本地
     "filesystem": {
        "command": "npx",
        "args": [
            "-y",
            "@modelcontextprotocol/server-filesystem",
            "E:/workspace/lesson_hm/ai/agent/mcp_in_action/mcp-test"
        ]
     },
     "chrome-devtools": {
        "command": "npx",
        "args": [
            "-y",
            "chrome-devtools-mcp@latest"
        ]
        }
    }
    //agent也会拥有跟配置一样的向mcp通信的能力 拿到工具的能力
});

const tools = await mcpClient.getTools();
console.log(tools,'///');
const modelWithTools = model.bindTools(tools);
//从 MCP 服务器获取工具 → 把工具能力注入大模型

async function runAgentWithTools(query,maxIterations=30) {
    const messages = [
        new HumanMessage(query)
    ];
    //为什么需要这个循环？
    // 因为AI需要调用工具，工具需要返回结果，AI需要根据工具调用结果继续思考 
    //是渐进式的
    for (let i = 0;i < maxIterations;i++) {
       console.log(chalk.bgGreen('正在等待AI思考'));
       //这里的messages 不仅仅是刚开始的任务还有之前的工具调用结果
       const response = await modelWithTools.invoke(messages);
       messages.push(response);

       if (!response.tool_calls || response.tool_calls.length === 0) {
           console.log(`\n AI最终回复;${response.content}\n`);
           return response.content;
       }

        console.log(chalk.bgBlue(`检测到${response.tool_calls.length}个工具调用`));
        console.log(chalk.bgBlue(`工具调用: ${response.tool_calls.map(t => t.name).join(', ')}`));

       for(const toolCall of response.tool_calls){
            const foundTool = tools.find(t => t.name === toolCall.name);
            if(foundTool){//在langchain里执行函数要用invoke方法
                const toolResult = await foundTool.invoke(toolCall.args);
                let contentStr;
                if (typeof toolResult === 'string'){
                    contentStr = toolResult;
                }else if (toolResult && toolResult.text){
                    contentStr = toolResult.text;//如果返回的是对象 且有text属性 就用text属性的值
                }
                messages.push(new ToolMessage({
                    content:contentStr,
                    tool_call_id: toolCall.id
                }));
            }
        }
    }
    return messages[messages.length-1].content;
}//agent 智能规划  一个mcp完成不了 就多个mcp合作

// await runAgentWithTools('北京南站附近的酒店，以及去的路线')
//  await runAgentWithTools(`北京南站附近的两个酒店，以及去的路线，
//    路线规划生成文档保存到E:/workspace/lesson_hm/ai/agent/mcp_in_action/mcp-test 的一个md文件`)
await runAgentWithTools(`北京南站附近的3个酒店，拿到酒店图片，
    展开浏览器，展示每个酒店的图片，
    每个tab一个url展示，并且把那个页面标题改为酒店名`)

await mcpClient.close();