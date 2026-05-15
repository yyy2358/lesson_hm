import 'dotenv/config';//告诉面试官用了dotenv gitignore langchain chalk包
import { ChatOpenAI } from '@langchain/openai';
import {
    HumanMessage,
    SystemMessage,
    ToolMessage//指向大模型的消息
} from '@langchain/core/messages';
import {
    readFileTool,
    writeFileTool,
    executeCommandTool,
    listDirectoryTool
} from './all_tools.mjs'
import chalk from 'chalk'//彩色输出  终端输出带上文字

const model = new ChatOpenAI({
    modelName: process.env.MODEL_NAME,//比qwen-coder-turbo 更强大
    apiKey:process.env.OPENAI_API_KEY,
    temperature:0,
    configuration:{
        baseURL:process.env.OPENAI_BASE_URL,
    }
});

const tools = [
    readFileTool,
    writeFileTool,
    executeCommandTool,
    listDirectoryTool
]
//modelWithTools
const modelWithTools = model.bindTools(tools);

async function runAgentWithTools(query,maxIterations = 30){//防止它陷入 “思考→调用工具→再思考→再调用工具” 的无限死循环
      //检测任务完成情况
      //不用tool表示完成   在用tool表示 llm 还在自动运行中
      const message = [
        new SystemMessage(`
            你是一个项目管理助手,使用工具完成任务。
            当前工具目录: ${process.cwd()}

            工具:
            1. read_file: 读取文件
            2. write_file: 写入文件
            3. execute_command:  (支持workingDirectory参数)
            4. list_directory: 列出目录

            重要规则 - execute_command:
            - workingDirectory 参数会自动切换到指定目录
            - 当使用workingDirectory 参数时,不要再command中使用cd 命令
            - 错误示例: {command: "cd react-todo-app && pnpm install", workingDirectory: "react-todo-app"}
            这是错误的！因为 workingDirectory 已经在 react-todo-app 目录了，再 cd react-todo-app 会找不到目录
            - 正确示例: {command: "pnpm install", workingDirectory: "react-todo-app"}
            这样就对了!workingDirectory 已经切换到 react-todo-app,直接执行命令即可

            回复要简洁，只说做了什么
            `),
            new HumanMessage(query),
      ];//prompt写好token消耗更少
      //循环时agent的核心  让llm 思考,规划,调整  不断迭代  直到任务完成.更加智能体   
      //不断调用工具  for循环可以不断自检然后完成未完成的功能
      for (let i = 0; i < maxIterations; i++) {
        console.log(chalk.bgGreen('正在等待AI思考...'));
        const response = await modelWithTools.invoke(message);
        message.push(response)
        // console.log(response)
        if (!response.tool_calls || response.tool_calls.length === 0) {
            console.log(`\n AI 最终回复:\n ${response.content}\n`);
            return response.content
        }
//否则拿出来每个工具执行
        for (const toolCall of response.tool_calls) {
            const foundTool = tools.find(t => t.name === toolCall.name);//有多个tool 所以要判断
            if (foundTool) {
                const toolResult = await foundTool.invoke(toolCall.args)//invoke 把tool里面的函数拿出来运行
                 message.push(new ToolMessage({
                    content: toolResult,
                    tool_call_id:toolCall.id
                 }))
            }
        }
      }
    return messages[messages.length - 1].content;//返回最后这条消息的内容
}

const casel = `
创建一个功能丰富的React TodoList应用:
1. 创建项目: echo -e "n\nn" | pnpm create vite react-todo-app --template react-ts
2. 修改 src/App.tsx, 实现完整功能的 TodoList:
- 添加、删除、编辑、标记完成
- 分类筛选 (全部/进行中/已完成)
- 统计信息显示
- localStorage 数据持久化
3. 添加复杂样式:
- 渐变背景 (蓝到紫)
- 卡片阴影、圆角
- 悬停效果
4. 添加动画:
- 添加/删除时的过渡动画
- 使用 CSS transitions
5. 列出目录确认

注意: 使用 pnpm, 功能要完整, 样式要美观, 要有动画效果

之后在 react-todo-app 项目中:
1.使用 pnpm install 安装依赖
2.使用pnpm run dev 启动服务器
`
try {
    await runAgentWithTools(casel);//封装agent运行的主体流程
} catch(error) {
    console.error(`\n错误: ${error.message}\n`);
}