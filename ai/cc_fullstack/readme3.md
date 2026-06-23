# Claude Code RAG 项目
- 自我表达 会看一些吴恩达的AI 系列视频 
Claude Code： A higly Agentic Coding  Assistant

deeplearning ai   rag skills mcp 

- 项目介绍RAG 
  结合CC  agentic方式开发
   如何了解项目，
   新手如何介入项目

- 项目的重构

## 端到端的RAG 聊天机器人
## 用claude code 探索代码库
快速熟悉大型代码库 cc 和代码库聊天      让它给你解释原理 

rag 知识库 切割 向量化 存储到向量数据库 再检索增强生成    app.py应用文件启动端口 提供接口 前后端分离 做文件处理 切割     会看吴恩达 deeplearning的课    pyproject是依赖包    b站 手写 算法题都没有
就面试了半个小时   ChromaDB向量数据库 更主流

- give me an overview of the codebase
  cc Agent 
  入口、md、依赖关系 分析代码    不会把代码上传到cc的服务器上去
  memory 机制 
  无需查找每个文件，而是通过智能搜索找到最相关的内容，获得架构信息， 关键组件... 
  如果想要深入了解的内容
- 高级别问题 
  how are these documents processed? 
  不用进入文件夹搜索 
  生成流程图或可视化图表

- trace the process of handling a user's query from frontend to backend 
  想象自己对某一部分技术栈了解有限 不清楚整个流程是如何实现的
  列出代办事件清单
  写入文档

- Multi Agent 做法 
  Cursor/Claude Code 
  cc command-cli 并发

- 深入问任何细节

### 一图胜千言
- draw a diagram that illustrates this flow
- how do i run this application  怎么启动这个项目  可能要安装依赖 安装环境 比如Docker 还可能要装服务器环境部署 数据库
 
### claude code 的 init 命令  /init
初始化项目 
用代码库文档(readme.md)初始化一个claude.md文件 
/init 项目产品说明和技术架构
每次都会加入上下文 不能太大或太小   指定测试用例 代码规范

现在cc的命令越来越少了 是因为用文本也能调用这些命令 可以装mcp skills

- 不同级别的Claude.md 文件
    - 项目级别 
    /init 
    会在代码仓库中 共享  不能乱动
    子目录中嵌套Claude.md文件    前端 后端 功能模块都可以加
    - 个人级别
     Claude.local.md  不共享 比如自己的大模型key  自己开发的需求 或自己独立的模块
    加入到.gitignore 中
    - 机器上所有项目 
    ~/.claude/CLAUDE.md    根路径的.claude目录
    不去写项目相关
    针对编辑环境和终端环境的专属内容   所有项目都遵守的
    - 企业级别 CLADUE.md
    公司的代码风格 安全要求 放在服务器中
### harness
permissions

- always use uv to run the server do not use pip directly    用#添加到内存中 就是claude.md
     npm i dotenv   相当于python里的pip
      pnpm i dotenv 
      uv 新生代包管理器
- #make sure to use uv to manage all dependencies. 用uv管理所有依赖
uv是超快的Python包管理工具，替代pip，安装依赖速度飞快，还能管理虚拟环境。
虚拟环境  = 单独小房间，每个项目独自一套 Python、插件，A 项目装的包不会弄坏 B 项目。
不同项目要不同版本库互不冲突；

- /help 
  所有的系统指令 
  command 明确执行， 不需要语义理解，mcp/skills tool 需要语义理解

/clear 清空对话历史
 开发新任务或新功能 
 /compact 总结功能  也能减少开销
 escape 退出当前的chat

cc 和 git 联动
不需要指令提交，自然语言对话给他就可以  把-m后面的给他
/commit 自动生成提交详情
add and commit these changes 
git log --oneline 

大厂为什么会给员工很多token 因为他也是ai公司的投资人资本方