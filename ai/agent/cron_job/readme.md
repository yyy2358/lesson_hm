# 定时任务  
小龙虾是AI新windows   qclaw miniclaw

下个任务  明早九点，帮我把关于最新open claw 的新闻，整理成一篇日报，发到我的邮箱

- 日程安排的能力交给小龙虾
- 网络搜索tool
- 写文章
- 发邮件 要授权 用哪个服务器的服务

## 生成器
async await出来后用的比较少 它两是es8  promise是es6

普通函数，一调用就从头跑到尾
生成器函数 跑一些遇到yield 就停下来，当右边的promise解决后 可以从暂停的地方继续跑
async await的前身，也比较复杂

done表示有没有结束   这个可以用来讲流式输出
数字人分身

## RxJS
RxJS 是基于**响应式编程**的 JavaScript 库，依托 Observable 可观测对象，统一处理异步事件、数据流。它提供大量操作符，灵活组合、转换、过滤各类异步行为（请求、定时器、DOM 事件等），替代回调与 Promise，让复杂异步逻辑更简洁、易维护，广泛用于前端项目。

添加到简历的技术栈中 在React框架之后

用数据流的方式来处理异步事件 以前是用事件监听 回调函数来处理的
- JS里最常见的异步方式
    - callback 回调地狱
    - Promise 
    - generator/yield
    - async/await
    - event listener
以上是适合一次性的异步任务 
有很多异步任务是连续发生的事件
    - SSE Server-Sent Events 基于HTTP 长连接，服务器可以持续向客户端推送文本数据流
    - 输入框输入 
    - 鼠标移动
    - AI 流式输出

事件1->事件2->事件3->事件4
像一条河流

yield 后面是token的生成   
整个的跟大模型的问答就是一个生成器函数
### 流式输出
流式输出的核心原理是通过生成器函数（Generator）或可观察对象（Observable），将大模型的响应拆分为多个小片段，逐块异步返回，而非等待完整结果一次性输出。这样能显著提升用户体验，实现“边生成、边展示”的效果，类似打字机逐字显现

服务端通过 stream: true 标识启用流式响应，每次生成一批 token（如一个词或短语）就通过 SSE（Server-Sent Events）或 WebSocket 发送一个数据块；
前端通过订阅（subscribe）监听这个数据流，每收到一个片段就立即渲染，形成连续输出的假象；
这一过程可借助 RXJS 等流式处理框架，将异步事件（如模型输出）封装为可观察的数据流，实现高效、解耦的响应处理

将异步事件 变成数据流的方式输出


pipe：用于串联多个操作符，像连接水管一样，将数据流依次传入多个处理函数；
map：对流中的每一个数据项进行变换，返回新的值，而不改变流的结构。

原始流 → map（转换） → filter（过滤） → subscribe（订阅）

- 定时任务触发 Agent 的核心机制是：通过一个定时器（Timer）周期性唤醒 Agent，使其执行预设的“观察-决策-行动”循环。
思考-调用工具-判断是否完成”的循环：

- pnpm i  @langchain/core @langchain/openai zod @nestjs/config
nest g res ai --no-spec

先做全局变量的设置   记得把命令也写下来

投简历 多面试  手写题   复习项目
先拿小米挂一次，再冲击百度、腾讯等大厂。小米作为全国约30家同级别大厂之一，其面试难度适中，是提升实战能力的绝佳跳板。即使挂了，也意味着你已经接触并训练了高阶面试题（如算法、系统设计、手写快排等

- 用 NestJS 的 @Sse() 装饰器暴露接口，把大模型的 token 流通过 from() 包装为 Observable，再用 map() 输出 SSE 格式，前端订阅即可实现流畅的流式响应。
这不是背八股文，是我亲手在项目中实现的
- 面试官问“你如何实现流式输出？”时，重点讲清楚：

用 @Sse() 自动处理协议
用 from() 把异步流转为可观测流
用 map() 格式化为 SSE 标准格式
强调“不缓存、不关闭连接、逐块推送”——这是区别于普通接口的关键

- 大模型生成 token 是异步、逐批的，类似“水流”不断流出。
- Observable 是观察者模式的实现，前端订阅后，每收到一个 token 就触发一次更新。
- 使用 from 操作符，将大模型返回的 token 流（如 LLM 逐字输出）转换为 RxJS 的 Observable 对象：

from(largeModelStream).pipe(
  map(token => `data: ${JSON.stringify({ text: token })}\n\n`)
)
每个 token 都要按 SSE 格式封装：以 data: 开头，后跟 \n\n 结尾。
前端浏览器会自动解析这种格式，逐条触发 message 事件

- 工厂模式手搓了一个provide

- 流式输出（Stream Response）的实现，核心是通过 SSE（Server-Sent Events） 协议 + Generator 生成器 + 观察者模式
在 NestJS 中，通过 @Sse() 装饰器标记路由，自动设置响应头为 text/event-stream，并保持连接不关闭：

@Sse('stream')
stream(): Observable&amp;lt;SseEventMessage> {
  return this.aiService.generateStream(); // 返回可观察的流
}

设计模式： 装饰器模式 订阅发布者模式 观察者模式 工厂模式

### 流式输出
- 老师你好   不要怕 可能第一周回答不好 但是三周后随便回答 反正有ai 把题目给豆包让他用大佬的声调聊
- nest.js + rxjs 实现了服务器端sse接口
    - nest.js 以@Sse 装饰器模式 /ai/chat/stream

    - 本质是 设置了Content-Type: text/event-stream 响应头
    - Cache-Control: no-cache 别缓存
    - Connection: keep-alive 保持连接不关闭
    - Transfer-Encoding: chunked 分块传输      这里说前面的就行

    - service 模块根据langchain stream:true llm 流式响应
    - 拿到llm流式生成的token后  使用rsjx from api 将llm流式响应转成一个Observable对象
        pipe一下  map 转成前端需要大的data：chunk 格式
    - service 使用了langchain tool 定义了queryUserTool等tool   还可以挂邮件的tool定时器的tool 爬取的tool
    - llm 流式大模型响应 for await chunk  of stream
    - chunk 不断的concat 合并
    - 判断fullAIMessageChunk.tool_call_chunks
        - 如果是，不干
        - 如果不是，yield输出          rxjs盯着由langchian的stream流出的generate
    - agentLoop
        - 如果要调用工具 执行tool（args）
    - 结束





手抄promise手写  大海老师的文章 算法题
ai全栈  全栈前端都会有很大的需求 负责用户体验   再加个go或python  腾讯会议直接将代码文件

组合schema 最近有一篇文章         把笔记喂给ai 口语化表达一下  

和朋友组队模拟面试  面试题群里的   远程实习 要说现在过不去

有一个对象可以跟后端建立持久链接 后端有数据块到达的时候有一个事件来接收它
前端如何跟sse的接口建立一个事件呢 eventsource  html5的新特性

EventSource 是浏览器原生 API，用于服务端推送 SSE，建立长连接单向接收服务端实时消息，比轮询高效，轻量易用，不支持双向通信。

场景题 vibecoding的题目  harmes规范驱动编程   es6
react+ts+nest+next


## Event Source
- html5 特性的时候   
    - 语义化标签  
    - video/audio标签， 哔哩哔哩
    - canvas  游戏和3D 做页游的
    -  定位 Geolocation  经纬度 实现美团的点外卖
    - 表单的增强能力  placeholder 占位符 required  type="range" 新增的input的类型（在范围之内选择）
    - llm 流式输出 EventSource 自动接收服务器推送的文本数据流 （面试做一个钩子->rxjs generate生成器）
    - localStorage/sessionStorage 本地存储  里面还有个本地数据库
        localStorage：永久存储（5MB 左右），关闭浏览器不丢失
        sessionStorage：会话级存储，关闭标签页即清除
    - Web Worker  JS 多线程  浏览器进行复杂运算时用的功能
    - WebSocket 双向通信 也可以跟服务器端保持持久链接
    - 拖放 API 
    - getUserMedia 摄像头 web直播/视频
    - history API 前端路由  用于在不刷新页面的情况下操作浏览器历史记录 支持前端路由（如 hash 路由与 history 路由），实现单页应用（SPA）中 URL 的动态更新与状态管理

整个流程
nest 里面用了langchain  还加了rxjs generator生成器 前端eventSource


### 深化tool
用语义化操作数据库的tool
把queryUsertool改成可以自己走service文件
将service跟tool分离
- query_user
    把tool作为provide 在module 里声明，和原有的service解耦
    依赖注入的方式model.bindTools()


- ts的Partial 和 Omit 
Partial 可选   Omit 排除
partial: Partial<Omit<User,'id'>>
应用场景  nestjs Patch 局部更新用户信息时，参数的数据校验
Partial<T> 将类型 T 的所有属性转为可选；Omit<T,K> 从类型 T 中排除指定 K 属性。
二者结合：先排除 User 的 id 字段，再将剩余所有属性转为可选，实现只更新用户非 id 字段的任意部分。

支付模块     osi集成协议  下四层  网络层 数据链路层 传输层
TCP       408要占百分之三十   
问到vue怎么回答： 多做react 对于现代前端开发框架的mvm、响应式、虚拟dom、diff算法、组件化开发 都非常了解 如果做vue开发很快救能上手
## 邮件tool
- ushppwmltzfiddfe
- 邮件服务
    服务器  提供http 服务（Web Server 3000|nginx配置成 80），邮件服务，数据库服务（3306）
    端口
    pnpm i nodemailer(邮件npm) @nestjs-modules/mailer(nest 接入nodemailer,生态很好)
    - 邮件服务 发送的内容是邮件，不是text/html
    - 传输？不能用http这个应用层的协议 内容不是html   要用SMTP 408
        是一种用于发送电子邮件的标准网络协议。 它工作在应用层，使用默认端口 25 或 587（加密传输），与 HTTP、HTTPS 等协议不同，专门服务于邮件传输场景。
        QQ邮箱提供的SMTP服务

sk-74b5637e99a0439db1067c6e873476e9

讲八股文要讲实战的场景 讲es6 要讲set map 埋钩子
了解底层 可以定制开发 skills 开发工作流 用langchian写agent