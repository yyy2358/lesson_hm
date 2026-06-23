# Claude Code
关键技巧：提供清晰的上下文 
  指明文件的位置
  清楚描述你要的功能和特性
  确保用MCP服务器和生态系统中其他工具

planning thinking 创建并行会话
去除冗余代码

## cc的架构
提供一个轻量的框架 harness
## 工作流程
代理式搜索 不用把代码库上传到服务器 代码无需全部加入上下文 也不必离开当前生态系统
claude.md 定义通用配置或风格指南  想要cc总是怎么做
复杂代码库先了解总体情况 
架构 关键组件 功能介绍 技术框架  架构图  写claude.md基本也是这些内容
解释原理
流程图 可视化图表 ascii艺术图   D3.js  Recharts根据网页效果
追踪用户查询从前端到后端的处理流程

 创建项目前 /init
 claude.md 指定运行方式 测试用例 代码规范检查 记住长期信息 项目
 ### 三个claude.md文件
 全局claude.md 在/claude目录下   claude.local.md不会被提交
 每个子目录都可以加

 /ide 指定当前所在文件 获取特定行信息
 更改内存#
 还可以自定义命令
 /clear 清空上下文
 /compact 清除历史但保留摘要
 /escape 退出当前命令
 添加并提交这些更改 写详细的提交说明 

 构建界面让前后端正确渲染链接 显示数据来源
 添加功能 ->引用正确的文件 使用计划模式 两次shift+tab
 让Claude先详细规划需要做哪些修改
 先给他prompt构建一个什么功能的应用 自动接受修改一次shift+tab
@ 引用文件  \回车换行
用mcp让cc能访问外部数据源和系统 
claude mcp add后接mcp服务器名称  要先退出cc
npx playwright/mcp@latest  不用手动截图 
/ mcp

rag聊天机器人

- 测试、错误调试、代码重构
扩展思考能力 思考更久   每次查询只进行一次搜索  迭代遍历所有工具
制定不同的重构方案 先别写代码

- 开启多个会话 实现多功能并行开发 避免文件被重复覆盖 可以使用Git WorkTress
写一个自定义命令 xxx.md 在commands文件夹中创建 比如implement-feature.md 输入想要的特定功能
为自定义命令传递参数 要用$arguments变量来引用它 每次使用这个命令时 
会指定你正在实现一个新功能  或者对他进行限制 比如只针对前端功能执行并更改 写入前端.md文件中
  - /change 把 getUsers 函数改成 async/await 风格 → 找到代码文件直接改
  - /change 把上一条回答翻译成英文 → 重新生成翻译后的回答

  mkdir .tree 
  git worktree add .tree/名字   git branch -a 
  ui test quality  这些分支  可以并行更改代码
  add and commit with a descriptive message 再回到主分支合并这些内容
  use the git merge command to merge in all of the worktrees in the .trees folder
  and fix any conflcts if there are any
  添加并提交 附上描述性信息 
  使用git merge命令 将.trees 文件夹下所有工作树合并进来 并解决可能存在的冲突

- 设置cc来审查拉取请求并修复github中的问题 使用cc钩子来使用工具前后执行代码
github app  再拉取请求和问题中使用cc来响应反馈 修复错误 修改代码
添加一个hooks 在setting里面就可以在调用工具前或后执行命令 或者让Claude在特定事件发生时自我审查


claude --resume 回到之前对话     推送到github
gh CLI
cc自带的 github集成  /install-github-app
 git remote -v    git push -u origin master 成功将 master 分支推到 GitHub。
 创建仓库后 ● 添加远程地址的命令是：

  git remote add origin https://github.com/用户名/仓库名.git

  对应你这个项目的完整命令就是：

  git remote add origin https://github.com/yyy2358/RAG-Chatbot.git

直接问ai这是我想要做的事 请为完成此任务提供最优的提示词
为数据加载和处理创建一个独立的python文件
把重构后的笔记本转换成专业的Streamlit仪表盘 引入pandas 等等可视化工具
需要一个包含标题和筛选器的页眉 用卡片展示关键指标 包括收入 条形图 明确数据展示和信息渲染的方式

代码库规则添加到claude.md 

figma mcp服务器  playwright mcp服务器
next.js 更现代的前端开发技术栈
网页搜索工具  mcp figma  playwright