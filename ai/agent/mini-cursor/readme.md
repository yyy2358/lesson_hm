# 手写cursor最小版本
- 2026年ai agent爆发年 千问出故障  看一下养虾的视频  claw 还要服务器
manus自动完成计划 在网上找资源卖了即使几十亿美金给Facebook 
还可以给公司的电脑发送指令 做项目只需要再测试一下就可以上线  虚拟员工   都做成智能体
 token 算力   mcp skills AIGC时代->AGI时代 
 先把思想构建起来就可以做ai应用了
 搞好Agent+react+node.js +ts   搞个cursor付费   刷算法 面试题   他们都刷了一百多道算法题
 让chatgpt 写自己的项目介绍  我的那个健身的ai智能体  创意点 功能点 项目难点 ai亮点
 今年一定是ai应用开发
 AI Agent 全栈开发工程师   智能体开发工程师
 
## 近期Agent 爆火产品
- 千问点奶茶 豆包  元宝
   互联网计算向ai agent 推理，运行的一个划时代的产品，更复杂，更智能，更强大
- openclaw 养虾
   一人公司,一个人能做很多事
   虚拟数字人，多agent
   会编程agent(cursor)Claude大模型  会写ppt 算账 市场
   可以启动各种配置 配置各种角色
   任务拆解,做计划,找到一批需要的Agent 自动完成任务
   Manus 
   相当于开源版本的Manus
- seedance 抖音视频的数据

- 从llm prompt engineering(DeepSeek)->Agentci(更智能)engineering (全栈) 智能体开发工程师
- 了解cursor的底层架构
- AI Agent 如何打造  (春招王牌)
   - 直接调用大模型?获得智能,生成代码
      Gemini 3.1 pro 自己有生态
   - 你上周和它聊过的消息,它是不是记不住? 比如bug  Memory  
   - 你让他帮你访问一个网页,做一些事情,怎么做? Tool (mcp,skills)
   - 你想让他基于公司内部的私密文档做一些解答 RAG 知识库

     - Claude code  个人风格 团队风格 代码样式产品 都可以记住 
   
   AI Agent = llm + Memory + Tool + RAG

## Agent 是什么?
其实就是给大模型扩展了Tool和Memory,他本来就可以思考,规划,你给他用Tool 扩展了能力 他就可以**自动**做事情,用memory 管理记忆,他就可以记住你想让它记住的东西,还可以使用RAG,查询内部知识来获取知识(context)
  (一个智能的以完成任务为核心的一个产品,成长型)
 
 这样一个知道内部知识,能思考规划,有记忆,能够帮你做事情的扩展后的大模型,就是一个Agent
      
## Tool 工具   cursor  trae Claude code  codeX

### 用react 创建一个todoList  或vite+react
-  任务,期待Cursor 编程Agent 完成   
- llm 思考(thinking),规划(planning) AIGC生成代码
- tool 让llm扩展 有读写文件的能力,项目就生成了
- 还要一个tool  让他在bash 执行命令

### Langchain
AI Agent 框架  提供了 memory tool rag 的封装
后端功底(node) Nest.js     读取文件 发送请求 接口 数据库

AI  Agent 全栈开发   (Agentic engineering)

## LLM with Tools

- llm 选择 
  qwen-coder
- tools    //交给agent任务  大模型拿到后不能直接处理  有读文件的功能toolmessage告诉用户
  [read,write,exec] 函数 后端node编写 fs.writefile     Volta工具链管理器
  - 会返回id 工具调用的 “身份 ID”，用来匹配「调用」和「结果」


- pnpm i @langchain/openai  适配了常见的模型   是ai Agent开发框架
  调用模型的invoke方法就会变成可执行的chain
  先给读文件的工具 还有分析工具 慢慢加大模型能力就更丰富
- pnpm i langchain @langchain/core

-zod   
  ts里数据校验的一个库
  schema 定义模式 利用 Zod 提供的 API，用代码声明一套数据验证规则。约束声明  参数格式

- 把任务交给大模型 读取文件写代码  大模型没有能力直接操纵文件所以要借助tools  就是先调用工具 多个工具   promise并发执行

- 工具使用的消息  可以带上工具使用的结果 和执行的结果是为哪个工具调用的id服务的  把这些打包给llm 有了执行工具完的上下文