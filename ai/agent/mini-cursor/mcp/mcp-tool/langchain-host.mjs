import 'dotenv/config';
//adapter mcp 适配器 
import { MultiServerMCPClient } from '@langchain/mcp-adapters';
import { ChatOpenAI } from '@langchain/openai';
import { 
    HumanMessage,
    ToolMessage
}from '@langchain/core/messages';
import chalk from 'chalk';
//host 

const model = new ChatOpenAI({
    modelName:process.env.MODEL_NAME,
    apiKey:process.env.OPENAI_API_KEY,
    configuration: {
        baseURL: process.env.OPENAI_BASE_URL,
    },
});
//可以配置动态加载多个mcpserverclient的配置
const mcpClient = new MultiServerMCPClient({
    mcpServers: 
        {
            'my-mcp-server': {
                command:'node',
                args:['e:/workspace/lesson_hm/ai/agent/mini-cursor/mcp/mcp-tool/my-mcp-server.mjs']
            }
        },
    //agent也会拥有根配置一样的向mcp通信的能力 拿到工具的能力
});

const tools = await mcpClient.getTools();
console.log(tools,'///');
const modelWithTools = model.bindTools(tools);
//从 MCP 服务器获取工具 → 把工具能力注入大模型



async function runAgentWithTools(query,maxIterations=30){
    const messages = [new HumanMessage(query)];
// ReAct 循环
    for(let i=0;i<maxIterations;i++){
        console.log(chalk.bgGreen('正在等待AI思考...'));
        const response = await modelWithTools.invoke(messages);
        console.log(response,'///');
        messages.push(response);//assistant tool_calls   content为空

        if (!response.tool_calls || response.tool_calls.length === 0) {
            console.log(`\n AI 最终回复：\n ${response.content}\n`);
            return response.content;
        }
        console.log(chalk.bgBlue(`检测到${response.tool_calls.length}个工具调用`));
        console.log(chalk.bgBlue(`工具调用: ${response.tool_calls.map(t => t.name).join(', ')}`));

        for(const toolCall of response.tool_calls){
            const foundTool = tools.find(t => t.name === toolCall.name);
            if(foundTool){//在langchain里执行函数要用invoke方法
                const toolResult = await foundTool.invoke(toolCall.args);
                messages.push(new ToolMessage({
                    content:toolResult,
                    tool_call_id: toolCall.id
                }));
            }
        }
    }
    return messages[messages.length-1].content;
}

const result = await runAgentWithTools('查一下用户 002 的信息');
console.log(result,'///');
await mcpClient.close();//client会和server保持连接 让主进程停下要把连接关掉
