# MCP

- llm with tools
    read write listDir exec tool
    llm+tools = Agent 
    甜头 llm真的能干活了 

- mini-cursor
  llm with tools 不太满意,    把能力封装成函数用mcp的形式提供给用户使用
  怎么把llm 能干活的甜头扩大呢? 要用更多的tools,更好的tools,  用第三方的tools
  也可以自己写一些更好的tools 封装成mcp上交到应用市场 开源  向外提供tool  大厂就会将自己的服务以mcp的方式向外提供
  - 80%的App 会消失
  - 集成第三方mcp 服务  mcp其实就是tool   stdio标准输入输出库
  - node 要调用 java/python/rust 等其他语言的tool
  - 远程的tool

## MCP 
Model Context Protocol   Anthorpic公司开发
在大量的将本地，跨语言、第三方的tool 集成到Agent里来的时候，让llm强大的同事，也会带来一定的复杂性（对接连调）
大家都按一个约定来

## 按MCP协议 来开发，将我们的服务或资源 输出出去

## MCP协议 还有通信部分
   - stdio 本地命令行
   - http 远程调用

## MCP 最大的特点就是可以跨进程调用工具
   - 子进程 node:child-process
   - 跨进程 java/rust
   - 远程进程
   让llm 干更强大的任务
   会繁杂(来自本地、跨语言、跨部门、远程) 不同的通信方式(stdio,http)
   规范的提供工具和资源,mcp协议 

## 编写满足MCP协议规范的Tool

- Model Context Protocol
   仍然是tool 返回result的 成为了ToolMessage交给llm Context 上下文
- Anthorpic 24年底  25年底 贡献给开源社区
- sdk @modelcontextprotocol/sdk  开发的tool就能满足mcp的要求 别人在agent 就能集成我们的mcp服务
支持ES  Module 的模块化机制JavaScript

mcp开发工程师   去年春招是因为大模型deepseek浪潮   今年有mcp龙虾 skills

调用mcpserver 在根据里面定义的tool 完成任务返回结果做一个toolmessage
记得安装zod

- 为什么MCP需要配置 ？
   - Client/Server  c/s架构
   - cursor trae       编程agent   支持MCP规范的 client（客户端）    
   - 读取mcp.json 找到需要的mcp tool  
     - 手写 MCP  在tool的基础上加上MCP规范
       - tool 需要一个server 容器  @modelcontextprotocol/mcp/server... 提供
       - server可以registerTool 注册tool
         - description 描述tool的功能
       - connect transport  连接工具
   - client 和 server 会先连接transport  然后才能调用tool
        - transport 可以是stdio,http 等
        - client 可以是node,python,java 等

## skills

## mcp 三者关系

- mcp hosts
  - cursor/vite  是agent的host
- mcp client 
   遵守MCP 规范的tools
- mcp server
   - mcp tool 运行的服务器容器
   提供mcp服务的进程
   host里面的每一个mcp tool 都是一个client 会跟本地或远程的server 通信

- 工作流程
   - MCP hosts 配置文件  SDD 规范驱动编程 
   - initialize 发送一起请求   会先连接一次
      - 得到mcp server 提供的tools 列表和详情
   - 还没调用就会有这个query-user描述 是因为在配置的时候host会跟server进行initialize 初始化
   - host 接收prompt任务
   - 检索 mcp配置文件 
   - client tool 通信方式
   - 调用mcp server 执行并返回结果
   - 向llm 发送 ToolMessage

## 随记
<!-- 大厂在年轻里挖到认识视野超前 会给你学习时间福利待遇 -->
- MCP Server 是一个遵守 Model Context Protocol (模型上下文协议) 规范的、提供 工具 (Tools) 和 资源 (Resources) 给 AI 客户端（如 Trae, Cursor）的 独立服务进程 。
- 不止可以通过mcp调用一些工具 还可以获取资源
- 练练英语 吴恩达  
- tool memory rag skills    Sub-Agent（子代理）
- pnpm i dotenv @langchain/openai @langchain/mcp-adapters @langchain/core  pnpm add langchain
- 业内常用mcp 深入在程序中集成mcp
- 面试官会追问你有没有打造agent 的经验
- 不能解决要调用工具 有没有content 大模型调用工具时不会生成任何文本回答所以content为空  additional_kwargs用来存放大模型返回的非标准文本内容
- 使用工具的信息 tool_calls说明大模型支持一次并行调用多个工具    消息唯一ID
- MCP Host = MCP Client + 大模型 + Agent 循环
- MCP 的核心价值：统一大模型与外部工具的通信标准。
- MCP 是 Tool 的标准化载体和通用通信协议。
- mcp + skills  加点小龙虾 
- 百度的agent平台创建一个应用  vibe coding   四号会关闭 
-  "amap-maps-streamableHTTP": 
## MCP 开发流程
- new McpServer 创建了mcp server 实例

- server.register  Tool/Resource/prompt  名字  描述  执行函数
- 通信方式 StdioServerTransport  HttpServerTransport
- server.connect(transport)  连接transport
- host端 mcp 配置

## mcp 直接入住Agent 程序

- 怎么把 mcp tools 集成到程序里面？ agent就可以通过进程间通信 来调用mcp tools
   mcp 是可拔插的   可以插入到任何你想要的软件中