// langchain tool 工具
import { tool } from "@langchain/core/tools";
import fs from 'node:fs/promises'//node 自带的模块  异步就可以做掉不需要多进程
import path from 'node:path';
import {
    spawn
} from 'node:child_process';
import { z } from 'zod';

//读取文件工具
const readFileTool = tool(
    async ({filePath}) => {
        try {
            const content = await fs.readFile(filePath,'utf-8')
            console.log(`[工具调用] read_file("${filePath}") 成功读取 ${content.length} 字节`)
            return `文件内容: \n${content}`//把tool函数执行的结果以tool message的形式发送给llm 带上tool id
        } catch (error) {
            console.log(`[工具调用] read_file("${filePath}") 失败: ${error.message}`)
            return `错误: \n${error.message}`//把tool函数执行的结果以tool message的形式发送给llm 带上tool id
        }
    },
    {
        name:'read_file',
        description:'读取指定路径的文件内容',
        schema:z.object({
            filePath:z.string().describe('文件路径')
        })
    }
)
//写入文件工具
const writeFileTool = tool(
    async ({filePath,content}) => {
        try {
            //要写入文件的路径  /a/b/c.txt
            const dir = path.dirname(filePath);
            //make directory 创建目录   recursive:true 递归创建
            await fs.mkdir(dir, { recursive: true});
            await fs.writeFile(filePath,content,'utf-8');
            console.log(`[工具调用] write_file("${filePath}") 成功写入 ${content.length} 字节`);
            return `文件写入成功: ${filePath}`;
        } catch (error) {
            console.log(`[工具调用] write_file("${filePath}") 失败: ${error.message}`)
            return `写入文件失败: ${error.message}`//把tool函数执行的结果以tool message的形式发送给llm 带上tool id
        }
    },
    {
        name:'write_file',
        description:'向指定路径写入文件内容,自动创建目录',
        schema:z.object({
            filePath:z.string().describe('文件路径'),
            content:z.string().describe('要写入的文件内容')
        })
    }
)

//执行命令工具

const executeCommandTool = tool(
    //指定终端命令执行时的当前工作目录
    async ({command,workingDirectory }) => {
       const cwd = workingDirectory || process.cwd();//默认当前目录
       console.log(`[工具调用] execute_command("${command}") 在目录 ${cwd} 执行命令`);
       return new Promise((resolve,reject) => {
        const [cmd, ...args] = command.split(' ');
        const child = spawn(cmd,args,{
            cwd,
            stdio:'inherit',
            shell:true
        })
        let errorMsg = '';
        child.on('error',(error) => {
            erroeMsg = error.message;
            // reject(error);
        })
        child.on('close', (code) => {
            if (code === 0) {
                //成功退出
                console.log(`[工具调用] execute_command("${command}") 命令执行成功`);
                const cwdInfo = workingDirectory?
                `
                \n\n重要提示:命令在目录"${workingDirectory}"中执行成功。
                如果需要在这个项目中继续执行命令,请使用 workingDirectory
                "${workingDirectory}"参数, 不要使用cd 命令
                `:`
                `//三元运算符 传入了workingDirectory这个参数就把这段提示文字赋值给 cwdInfo  langchain工具调用中cd命令无效
                resolve(`命令执行成功: ${command} ${cwdInfo}`);
            } else {
               if (errorMsg){
                console.error(`错误, ${errorMsg}`);
               }
               process.exit(code || 1);
            }
        })
        })
       },
    {
        name:'execute_command',
        description:'执行系统命令,支持指定工作目录,实时显示输出',
        schema:z.object({
            command:z.string().describe('要执行的终端命令'),
            workingDirectory:z.string().optional().describe('命令执行的当前工作目录')
        })
    }
    )

    //列出目录工具
    const listDirectoryTool = tool(
        async ({ directoryPath }) => {
            try{
                //读取目录的内容
               const files = await fs.readdir(directoryPath);
               console.log(`[工具调用] list_directory("${directoryPath}") 成功列出 ${files.length} 个文件`);
               return `目录内容: \n ${files.map(f => `- ${f}`).join(`\n`)}`//将一个文件数组格式化为带项目符号的目录列表字符串
            } catch(error) {
                console.log(`[工具调用] list_directory("${directoryPath}") 失败: ${error.message}`)
                return `列出目录失败：${error.message}`
            }
        },
        {
            name: 'list_directory',
            description:'列出指定目录下的所有文件和文件夹',
            schema: z.object({
                directoryPath: z.string().describe('目录路径')
            })
        }
    )


//提供工具的模块
export {
    readFileTool,
    writeFileTool,
   executeCommandTool,
   listDirectoryTool
}