//B/s架构 Browser/Server  web程序  浏览器加服务器  html
//  C/S架构  Client/Server  通信    客户端加服务器
//mcp是一个协议 有通信
//mcp client  比如cursor
//向mcp server发送通信 my-mcp-server.mjs
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
//标准输入输出流 通信
import { StdioServerTransport  } from "@modelcontextprotocol/sdk/server/stdio.js";
//tool 数据服务
const database = {
    users: {
        "001": {id: "001", name: "张三", email: "zhangsan@example.com", role:"admin"},
        "002": {id: "002", name: "李四", email: "lisi@example.com", role:"user"},
        "003": {id: "003", name: "王五", email: "wangwu@example.com", role:"user"}
    }
}

const server = new McpServer({
    name: "my-mcp-server",
    version: '1.0.0',
})//server容器
//这个tool要允许别人能连上  允许mcp的client 能连上
server.registerTool('query-user',{
    description: '查询数据库中用户信息。输入用户ID,返回该用户的详细信息(姓名,邮箱,角色)。',
    inputSchema: {
       userId:z.string().describe('用户 ID,例如:001,002,003')
    }
},async ({ userId }) => {
    const user = database.users[userId]
    if(!user) {
        return {
            content: [
                {
                    type: 'text',
                    text: `用户ID ${userId} 不存在。可用的ID:001,002,003`
                }
            ]
        }
    }else{
        return {
            content: [
                {
                    type: 'text',
                    text: `用户信息: \n- ID: ${user.id}\n- 姓名: ${user.name}\n- 邮箱: ${user.email}\n- 角色: ${user.role}`
                }
            ]
        }
    }
    
})
//注册资源：使用指南  提供资源给llm
//为什么叫Model Context Protocol 而不是Model Tool Protocol   超越了Tool的范围
// Context=Resource+Tool+PromptTemplate
//可以把一些知识文档给大模型
server.registerResource('使用指南','docs://guide',{
    description: 'MCP Server 使用文档',
    mimeType: 'text/plain',
},async () => {
    return {
        content: [
            {
               uri: 'docs://guide',
               mimeType: 'text/plain',
               text: `MCP Server 使用指南
               功能:提供用户查询等工具。
               使用:在Cursor、trae等MCP Client 中通过自然语言对话,cursor会自动调用相应工具`
            }
        ]
    }
})
//URI  统一资源标识符  比如docs://guide  是一个资源的唯一标识符



//连接方式 本地进程调用    跨进程
const transport = new StdioServerTransport();
await server.connect(transport)
