# cron job Agent

- openclaw 自动化任务
    每天早上9点 将最新的AI新闻发送到我的邮箱
    底层还是tool

- mysql 
    psql 激进 配置一下就可以支持 vector 存储 
    都是关系型数据库 mysql oracle 

    create database hello

- ORM 
    Object Relational Mapping 对象关系映射
    - Prisma  node链式调用 API 操作数据库
    - TypeORM  把实体类映射成数据库表，用面向对象方式写代码，不用原生 SQL。
    加在简历上     可以写进claude.md中看使用哪个

  不写sql语句就可以对数据库进行增删改查工作

nest 也是mvc架构 适合中小项目

pnpm i @nestjs/typerom typeorm mysql2     
nestjs 中imports 是引入其他模块的， 让当前模块能使用它们导出的服务、控制器等内容
provides 是提供服务的， 声明可注入的服务/工具类

- 创建了项目
    nest new cron-job-tool
    pnpm i @nestjs/typeorm typeorm mysql2 
    mysql2 数据库驱动程序 后端服务驱动数据库服务为我们做数据的存储 
    typeorm + @nestjs/typeorm 引入orm 让typeorm 最为nestjs 插件启动
- nest g resource users --no-spec
    创建一个users 模块  不需要生成测试文件  快速生成CRUD
    dto 数据传输对象  用于前端和后端之间传递数据
    entity 实体类  用于数据库操作
有了orm的概念后api不重要可以让ai生成
class-validator 是基于装饰器的校验库，用来给DTO字段加规则 自动验证入参是否合法
配置entity有哪些字段
zod 
enum 枚举类型

## 定时任务

cron job 
定时任务就是指定一个时间，到时会执行某个任务。
定时任务通常通过专门的工具（如 cron 表达式）来定义执行时间，避免因频繁操作数据库导致系统压力过大。
比如在晚上两三点分析用户数据
介绍 小龙虾 底层运作机制 tool nestjs模块化依赖理解很到位

pnpm i cron @nestjs/schedule 跟nestjs 一起使用
pnpm i -D @tyoes/cron 开发期间的依赖
-D
--save-dev 简写，安装为开发依赖。
只在本地开发、编译、类型检查时用，项目打包上线不会带入。
@types/xxx 是 TypeScript 类型声明包
作用：给 cron 库补充 TS 类型提示、语法检查，写 TS 代码不报错、有智能补全

linux curl 可以模拟发送一个请求 测试api 是否正常
curl -X DELETE http://localhost:3000/users/2
-X用来指定HTTP请求方法 

cron 一个表达式
7 12 13 10 * ? 
秒 分 时 日 月 星期 1-7 
* 任意一个月份 每个月
？ 忽略 星期几都可以     也可以改成具体数字 比如疯狂星期四

多种类型的cron job openclaw 自动化， 定时任务非常有需要


nest g module job
nest g service job --no-spec

## tools 模块
- AI Module imports Tool
- ai 模块，providers 越来越多，增长趋势
    不方便管理
- agent 形式提供服务   组织形式是怎么样的？
- 拆分 AI 模块的核心目的是为了解决单一模块过度膨胀、难以维护的
    随着功能增加（如新增搜索、邮件、定时任务等工具），AI 模块会不断累积代码，导致文件过大、逻辑混乱，难以定位和修改
    将工具与大模型服务从 AI 模块中剥离，形成独立的 tool 和 llm 子模块，可实现职责分离，使每个模块专注于单一功能
    拆分后，通过依赖注入机制（如 NestJS 的 @Injectable()），其他模块可按需引入所需服务，避免重复代码，提升复用性与可测试性
    这种结构更贴近工业级项目实践，使 AI Agent 不再是“工具集合”，而是由清晰服务组成的智能体系统，便于长期演进和团队协作

nest g module tool



## ZOD
Zod 是一个以 TypeScript 为中心（TypeScript-first）的架构声明和数据验证库。它的目标是消除“重复类型定义”的痛苦，让你通过一套代码同时获得 运行时验证 和 静态类型推导 。
在开发 AI Agent 或智能插件时，Zod 经常被用来：

1. 定义 Tool Schema ：通过 .describe() 方法（如 ai.module.ts:39 ），可以清晰地告诉大模型（LLM）每个参数的含义。
2. 安全防护 ：当 LLM 生成 JSON 调用工具时，Zod 可以在运行时拦截不合规的数据，防止数据库报错或逻辑异常。
3. 接口契约 ：确保前端传入的数据、AI 生成的数据以及后端处理的数据始终保持一致。

可选链运算符 ?.   空值合并运算符 ??

小龙虾 hermes底层原理项目    看小龙虾的源码
借鉴了小龙虾的源码 cronjob的三种类型 every at cron 

 讲这个项目 小龙虾太火了想了解他的地产机制

基于nestjs静态服务器 由sse这个前端部分 等待流式输出响应
ai模块负责chatbot 核心模块 从ai controlle sse装饰的路由进入 

skills都没讲
面试刚开始就要讲这个项目
小龙虾 定时任务 参照源码

ReAct agent行为模式框架 langchain是agent开发框架
定时任务细节编排  agent service里面编排工作流 结合mcp skills

以定时任务为例，比如10s通知我喝水，发邮件给我邮箱，帮我分析代码的如何，执行流程，给出每个文件的名字
核心文件清单 执行流程图  执行细节 

 ┌─────┬────────────────────────────────────┬───────────────────────────────────────────────────────┐
  │  #  │                文件                │                       干什么的                        │
  ├─────┼────────────────────────────────────┼───────────────────────────────────────────────────────┤
  │ 1   │ src/ai/ai.service.ts               │ Agent 大脑：System Prompt + LLM 流式对话 + 工具分发   │
  ├─────┼────────────────────────────────────┼───────────────────────────────────────────────────────┤
  │ 2   │ src/ai/ai.controller.ts            │ 接收前端 SSE 请求，入口 /ai/chat/stream               │
  ├─────┼────────────────────────────────────┼───────────────────────────────────────────────────────┤
  │ 3   │ src/tool/cron-job-tool.service.ts  │ cron_job 工具：三种类型（at/every/cron）的增删改查    │
  ├─────┼────────────────────────────────────┼───────────────────────────────────────────────────────┤
  │ 4   │ src/tool/time-now-tool.service.ts  │ time_now 工具：返回服务器真实时间                     │
  ├─────┼────────────────────────────────────┼───────────────────────────────────────────────────────┤
  │ 5   │ src/tool/send-mail-tool.service.ts │ send_mail 工具：通过 SMTP 发邮件                      │
  ├─────┼────────────────────────────────────┼───────────────────────────────────────────────────────┤
  │ 6   │ src/tool/llm.service.ts            │ 初始化 ChatOpenAI，连接 DashScope                     │
  ├─────┼────────────────────────────────────┼───────────────────────────────────────────────────────┤
  │ 7   │ src/job/job.service.ts             │ 调度引擎：setTimeout/setInterval/CronJob 的注册和执行 │
  ├─────┼────────────────────────────────────┼───────────────────────────────────────────────────────┤
  │ 8   │ src/ai/job-agent.service.ts        │ 后台执行代理：定时触发后执行 instruction              │
  ├─────┼────────────────────────────────────┼───────────────────────────────────────────────────────┤
  │ 9   │ src/job/entities/job.entity.ts     │ Job 数据库实体（id/type/instruction/at/everyMs 等）   │
  ├─────┼────────────────────────────────────┼───────────────────────────────────────────────────────┤
  │ 10  │ src/app.module.ts                  │ 根模块：注册数据库、邮件、定时任务                    │
  └─────┴────────────────────────────────────┴───────────────────────────────────────────────────────┘

   执行流程（4个阶段，12步）

  阶段一：AI 理解意图
    ① 浏览器 SSE → AiController → AiService.runChainStream()
    ② System Prompt + 用户输入 → 发给 LLM (Qwen)
    ③ LLM 调 time_now → 拿到服务器真实时间
    ④ LLM 调 cron_job(action='add', type='at', delayMs=10000, instruction='发邮件提醒喝水')

  阶段二：定时任务入库
    ⑤ JobService.addJob() → 写入 MySQL job 表
    ⑥ startRunTime() → setTimeout(回调, 10000ms)

  阶段三：定时触发
    ⑦ SSE 返回 "已设置，将在 XX:XX:XX 执行" 给用户
    ⑧ 10 秒后 setTimeout 触发
    ⑨ 更新 DB: isEnabled=false（at 类型自动停用）
    ⑩ 调用 JobAgentService.runJob(instruction)

  阶段四：执行任务
    ⑪ JobAgentService → LLM → 调 send_mail(to='2996144735@qq.com', ...)
    ⑫ SendMailTool → Nodemailer → smtp.qq.com → 邮件到达

    为什么 type='at' 执行完自动停用？

  job.service.ts:187 那行 isEnabled: false。at 是一次性任务，执行完就停；every/cron 是循环任务，需要手动 toggle。

   LLM 为什么要调两次？（时间 → 定时任务）

  因为 System Prompt 强制分步：必须先用 time_now 拿到真实时间，再调 cron_job。如果跳过 time_now，AI
  会用自己训练数据的假时间（Qwen 的内部时钟不准）。

  为什么用 delayMs 而不是让 AI 算 ISO 时间？

  delayMs=10000 → 服务器 Date.now() + 10000 算真实执行时间。这是踩坑后的设计——AI 编的 ISO 时间经常是错的。

  AiService（流式）和 JobAgentService（非流式）的区别？

  - AiService 面向用户 → stream() 逐字推给前端
  - JobAgentService 后台执行 → invoke() 一次性拿结果，更稳定

