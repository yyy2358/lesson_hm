# Skills

## MCP
Model Context Protocol  标准协议 让AI链接外部世界（工具/API/
PromptTemplate/文档） 向外界提供 把tool伸向了服务器

MCP 解决的是能做什么，却无法替代人类或高级智能体所具备的复杂情景判断，
创造性策略制定或领域模糊问题。

llm with tool 执行任务
mcp 将原有的服务提供给llm server 写一个mcp要用nest.js  使用mcp的sdk
去定义交互的方式 本地/远程  也有装饰器
sdk  @tool  工具
@Prompt prompt 模板
@resource 会定义我们向外提供的资源


## SKILLS 技能
- 形态是一个文件夹 ppt 专家
    - SKILL.md 必须的  就是一个Prompt
    技能声明
    - scripts 文件夹
    完成任务
    - 资源
SKILLS = 可复用的AI专业能力包（Prompt + 规划 + 工具 + 资源）

类比：
Prompt 一次性对话  跟大模型的交流是无状态的  RAG Tool 任务
SKILLS 把prompt变成 可复用的工作经验
小龙下安装各种SKILLS 自动化工作

- 为什么SKILLS会火
1.传统Prompt的问题
eg：帮我写一个PRD
问题：
- 每次都要重复描述
- 不稳定
- 不可复用

skills 解决什么
- 可复用 一次写好 多次使用
- 标准化，团队统一AI行为
- 可组合 多个SKILLS 组成Agent
- 低成本 不需要开发服务器端，MCP的区别 开发需求要写后端代码
SKILLS 是instruction + scripts + resources 的组合
MCP 可以完成任务 ， SKILLS 将任务怎么做的更好
小龙虾 Manus的开源版本  智能体管家 opc的实例
智能体的windows 操作系统来了

skills + mcp = 完整的AI Agent

用户：分析这个excel
MCP：读取excel
skills：在读取的同时按公司规划分析 + 输出报告


### brand-guidelines
要写一个这样的skills要遵守哪些原则
- gemini3 生成landing page 按照个skill 的要求 
    颜色，风格，主题， 像anthorpic
    公司开发skill ，有助于统一
- skills 的名字和文件夹的名字一样  小写，多个单词-连接
- SKILLS.md  prompt文件
    - 头部，YAML（json） 前置元数据
      name
      description     
- 先总述以下他的作用
- 关键字  用于描述skill的功能和适用场景

### pdf skills
该 Skill 涵盖了从 PDF 读取、提取、合并、拆分、OCR 识别到加密生成等全生命周期的自动化处理能力。
- 渐进式的
    技能比较复杂，多种场景，，可以渐进式的加载   能力有条件 需要就加载不需要就不加载
    SKILL.md 模块化加载别的md文件
    省token
- REFERENCE.md
- scripts 文件夹
    提供代码的能力  
    流程化的脚本化的 程序化的 完成任务
- SKILLS.md
    智能 规划 思考



把技能结合在一起  q-claw   小龙虾里面的就是一堆的skills
ai面试官skills    maxmini装小龙虾



Ralph Loop skills
code review

ui设计的skill