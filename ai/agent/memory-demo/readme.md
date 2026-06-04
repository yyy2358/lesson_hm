# Agent 记忆模块
  
-  Rag 太重要了
    - 最低的成本 （embedding） 丰富了llm的 精准（cosine）上下文
    - 大模型的微调（finetuning）也可以提升llm的能力，但是花费巨大，巨复杂
      成本比较高，
        是在预训练好的大模型基础上，用特定任务 / 领域的小规模数据再训练一次，把 “通用能力” 变成 “领域专长”，同时大幅降低训练成本。

- llm 的扩展
    llm + tool（干活） + RAG（知识库Context） + Memory（记忆）

- memory 是基石
    messages 数组 最基础的memory
    tool 为什么需要 基于Memory  toolMessage 工具调用是多轮断续动作
    rag ？ prompt增强  有搜索的记忆 RAG 是带着历史对话去检索、回答  可以把你以前ai使用过程 及习惯 变成一种记忆 作为你的知识库     
      我们的之前对话，能力的积累  能帮我们修改prompt
      SSD 规范驱动编程 

# 为什么需要管理memory

- 和llm的对话 是无状态的 Stateless
    模型本身不记忆任何过往对话、交互数据
    模型本身无记忆，会话记忆由外部程序拼接历史对话，随每次请求一并传入推理。
    因为llm简单，消费算力、电力，高并发基础设施
        基于请求 AIGC 生成，生成内容返回
    - http 也是这样的
        万物互联
        http 头 会带上Cookie，或Authorization  还是无状态的
    跟大模型对话的时候 怎样知道你是谁
    - 带上了memory
        messages 数组
- modelWithTools
    messages 数组放入了SystemMessage, 告诉他的据俄色色、功能，
    然后放入HuamnMessage 用户的问题（干什么）
    基于智能循环判断 tool_calls 
    将Tool 的返回结果，Tool Message 再加入message
    利用了Memory 把需要多轮对话的复杂任务，无状态的大模型也能搞定 增强大模型的实力

- 单纯的messages 数组很简单，但是有问题
    - context 越来越长， token消耗越来越多，触犯到上下文窗口大小限制

- 解决方案
    - 截断  slice（-n） 超过三段就删掉  最近最关心的对话还在 滑动窗口（最长的不重复的字符串的大小）  
    LRU 最近访问原则 
    - 将要截断的 message 总结一下 （summarize） 接口   总结    
    适合在当前多轮对话之中  Memory机制就够用了
    - 检索 （先存 数据库、文件）
    对memory 怎么理解：截断、总结、检索     是你跟ai会话的历史
    想问三天前的问题    lllm会把你跟他对话的历史存到本地文件系统或者milvus中 下次提问就可以做   rag ?
    对话历史已经成为了你再一次问的知识库 还不影响滑动窗口的大小 他会帮你自动带上 做一个相关性查询
      cursor等 超越当前对话，将之前对话存储，rag 利用的场景
      有了检索  Ai Agent越来越懂我们
    
     清空messages
     新的任务，节省token

     - cursor 通过messages 计算token 开销
       40% ， 0%  
       - 自动触发总结
       - 手动触发
       /compact
       /clear
       又能vibe coding 又能省token的 ai工程师

      message
     上下文达到40% llm会做一次总结   或者自己/compact 手动总结

ai+源码+全栈随便面  不要带情绪去面试  项目有的技术栈 其他的AI说就可以
面试没什么好怕的就跟面试官聊天而已 反正以后又不认识他
你问的这些问题概念我都了解 但是在具体的结合商业的业务上还没有进行尝试 我相信我到时候可以融入你们的集体
我对agent的langchain框架 核心模块都很清楚 但是没有在大的数量级上使用 rag没有在几百兆几个g上处理过

## FileSystemChatMessageHistory
- cursor 的message history实现方案
    - session 会话  代表一次会话  有一个主题
        - js 八股
        - 算法
        - 手写
        - AI
        变成session   AI测试官 给你出题
    - 全新主题，新开一个session
    - 持久化存储 messageHistory
    - 恢复某个session 继续chat
    - 实现了cursor 的Memory 的持久化功能理解

## 截断