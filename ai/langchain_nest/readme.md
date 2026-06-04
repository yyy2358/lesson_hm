# Nest+ langchain 实现AI接口
langchain 跑在服务器端 nest 是服务器端的框架
- 大多数Agent都是泡在后端服务
    Nest + LangChain 开发api接口
- nest？
    依赖 mvc
    面试要有控场的能力 起码要四十分钟
    node.js + typescript 的最主流框架
    底层是express（轻量级）
    提供了MVC、DI（依赖注入Dependencies Injection）等架构特性
    
- 创建项目 
给面试官讲一下功能点   koa  express    
为什么要选择这个技术栈？什么叫做nest 好处在哪里？适合企业级开发 是原生支持typescript
要拿大厂面试要多挂面试   手写面试题 笔试题
    - MVC 在哪？
    后端的开发设计模式   数据不能直接展示到视图上
    Model  Service 数据操作，远程rpc调用  微服务调用   负责数据存储 AI模型调用 业务逻辑
    View（前后端分离）
    Controller 控制器    参数校验和逻辑
    Module 会将Controller Service （providers） import 外部服务 组合起来形成一个功能模块
    适合企业级开发
    - DI  
        依赖注入是service通过providers在模块里注册了 是一个可以提供的服务 （任何地方都可以直接注入） 只需声明他是一个可以提供给当前模块或者外部模块使用的
        声明的时候要有injectable   要使用的时候引入一下 在构造函数声明一下就可以
        用constructor直接注入进来 会帮你直接实例化
        可以在controller里通过构造函数引入进来 声明为一个属性
    - 装饰器模式
        面向对象设计模式之一
        函数或类快速通过装饰器 增强功力
    - restful
    一切皆资源
    book（名词） + CURD（HTTP Method 动词）option

nest new hello-nest-langchain
npm run start:dev
nest g res book --no-spec   不生成 .spec.ts 测试文件    nest generate resource 
nest g res ai --no-spec    不用CRUD  因为ai只做一个chat   
dto
langchain 不太适合做多agent模式  cc
要用langgraph

缺了流式输出  还有apikey 要放到.env文件里
ai sdk
静态服务器
ai全栈
服务器端流式输出rsjs 流式框架