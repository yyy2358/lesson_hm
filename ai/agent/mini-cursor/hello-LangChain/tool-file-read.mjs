import 'dotenv/config';
import {ChatOpenAI} from '@langchain/openai';
import { tool } from '@langchain/core/tools';
import {
    HumanMessage,//用户消息
    SystemMessage,//系统消息
    ToolMessage//工具消息  user -> agent -> tool -> user  告知工具使用情况
} from '@langchain/core/messages';
//node 内置文件模块  主线程不能阻塞  promises 异步IO操作
import fs from 'node:fs/promises';
//数据校验 zod    tool parameter 参数校验
import { z } from 'zod';

const model = new ChatOpenAI({
    modelName: process.env.MODEL_NAME,
    apiKey: process.env.OPENAI_API_KEY,
    configuration: {
        baseURL: process.env.OPENAI_BASE_URL
    },
    temperature: 0,    //严谨性
});
//原生写法 麻烦
//新建一个tool    agent框架封装
const readFileTool = tool(
    //tool 处理函数的函数体  可写具体功能 也可模块化引入相应函数
    //分析xx 代码文件有没有bug   大模型不能直接处理代码文件
    //先tool 读取文件内容,path作为参数  await 等待读取
    //再去分析有没有bug
    async ({path}) => {
        //异步读取文件 传入路径 读取文件内容
        const content = await fs.readFile(path, 'utf-8');
        console.log(`[工具调用] read_file("${path}") 成功读取 ${content.length} 字节`)
        return content;
    },
    //tool 描述   要有清晰名字 描述 参数
    {
        name: 'read_file',
        description: `用此工具来读取文件内容。当用户需要读取文件、查看代码、分析文件内容时、调用此工具。
        输入文件路径(可以是相对路径或绝对路径)`,
        schema: z.object({
            path: z.string().describe('要读取的文件路径'),
        }),
    }
);

const tools = [readFileTool];
//langchain 提供发了一个方法 绑定工具
//model 不再孤单，有了工具的陪伴
//llm就可以干活了
const modelWithTools = model.bindTools(tools);//绑定tools   得到一个有tools的模型   接收数组参数
const messages = [
    new SystemMessage(`
        你是一个代码助手，可以使用工具读取文件并解释代码。

        工作流程:
        1.用户要求读取文件时,立即调用read_file工具
        2.等待工具返回文件内容
        3.基于文件内容进行分析和解释

        可用工具：
        - read_file: 读取文件内容(借用此工具来获取文件内容)
        
        `),
        new HumanMessage('请读取tool-file-read.mjs文件内容并解释代码'),
    ]
//llm返回的决策，他要调用工具了
//tool——calls 的api部分
//拿到name 去执行函数 result
//结果作为message  交给llm
//然后返回最后的结果
    let response = await modelWithTools.invoke(messages);
    messages.push(response);//把llm要调用工具的message 也加入message数组 形成多轮对话       进入数组后显示正在调用工具
    while (response.tool_calls && response.tool_calls.length > 0){
        console.log('\n[检测到 ${response.tool_calls.length} 个工具调用]')
        const toolResults = await Promise.all(
            response.tool_calls.map(async (toolCall) =>{//将tool_calls 数组转化为工具函数
                const tool = tools.find(t => t.name == toolCall.name);//证明工具是不是要调用了
                if (!tool) {
                    return`错误:找不到工具 ${toolCall.name}`;
                }//保证代码正确性
                console.log(` [执行工具] ${toolCall.name}(${JSON.stringify(toolCall.args)})`);//实时告诉用户大模型在干嘛
                //js单线程要注意稳定性
                try {
                    const result = await tool.invoke(toolCall.args);//调用工具函数
                    return result//某个promise就执行完了
                } catch (error) {
                    console.log(`错误 ${error.message}`);
                }
            })
        )//有多个工具要调用时 让所有工具动起来
        // console.log(toolResults);
        response.tool_calls.forEach((toolCall,index) => {
            messages.push(
                new ToolMessage({
                    content: toolResults[index],
                    tool_call_id:toolCall.id
                }
                )
            )
        })

        console.log(messages);

        response = await modelWithTools.invoke(messages);
        //不再有tool_calls 了 说明对话结束了
        console.log(response)
    }
    

    // console.log(response,response.content);
//console.log(process.env.OPENAI_API_KEY);  