# 说说ReAct框架， Thought-Action-Observation各是什么？
要planning自动计划任务， 而不是直接执行
langchain是开发框架         ReAct源码
## ReAct是什么
ReAct 是一种Agent执行框架，全称Reasoning and Acting。 它让Agent在
每一步先推理（Thought）, 在执行动作(Action), 然后观察结果(Observation),循环往复直到任务完成。
相当于js的event loop

## 为什么要有Thought  这一步？ 直接让LLM输出Action不行吗？
要先自然语义分析任务 充分理解
ai应用开发工程师重点考察这个ReAct框架 harness工程

没有Thought , LLM 看到任务就直接输出工具调用命令，错误率高。
因为复杂任务需要多不推理， LLM 如果不先 ”想清楚下一步该做什么，为什么这么做“，工具可能乱选、参数填错、逻辑跳步等。

Thought 本质是 Chain of Thought (Cot 是prompt的思考框架) 在Agent 场景的应用。
Cot 让LLM在回答问题前先写出推理过程（重要）ReAct 让Agent 在执行前
先写出决策依据。                                   可以增强prompt
不是装饰性的步骤， 而是保证Agent不出错的核心机制

## 为什么直接输出Action会出错？

帮我查明天北京到上海的航班，选最便宜的经济舱。

没有Thought 的Agent, 就像一个不经思考就行动的人， 看起来快，但错的也快

第一次调用：输出 {"tool": "search_flight", "from": "北京", "to": "上海", "date": "明天"}。
明天是相对概念， tool 需要准确的时间
工具要参数 要schema约束

llm 可以直接给出 tool json 描述，没有thought 不准确 API调用失败

不准确会
第二次轮询调用 上一次的错， 找到正确的时间 再试一次 
    token 开销+1

第三次调用 llm看到10个航班， 直接输出
{"tool": "book_flight", "flight_id": "CA1234"}
没有思考，没有比价， 中间没有推理过程， 不是最便宜的航班，任务失败。

Thought 先用token, 不浪费 ，更精确换成本。
没有Thought的Agent在复杂任务下的错误率可能是有Thought的3-5倍，
重试的成本远高于多写几句推理。

没有thought的话问题在于 llm 没有机会停下来想一想。
1. 参数格式错误 
LLM 不知道API要求的日期格式是什么， 自然语言 明天 填入
2. 逻辑跳步
    没有拿到最低价 llm 跳过了比价环节 直接订票  没有想清楚任务的完整步骤
3. 目标偏离 
    任务要求 最便宜的， llm没有显示推理 我需要比较价格 ，随便选一个 

## 为什么ReAct 要加Thought步骤
    Thought 不是给人看的日志（让AI 的执行流程可读、方便调试）， 而是给llm自己看的推理过程。
    LLM在Thought 里写 当前状态是什么？ 基于状态判断下一步应该做什么？ 为什么这么做？
    因为工具可以帮我们完成这个事情 把状态迭代到下一步
    loop就是状态的迭代
    thought要花token 花的值

    一个人去超市买菜 冲进去随便拿几样就结账 
    ReAct 地Thought 使用cot 先列购物清单 (Thought) ,再去拿东西(Action), 拿完检查一遍(Observation),确认没问题结账。


## Action 执行： Agent调用工具， 执行具体操作 
action本质 是结构化指令 JSON格式
Action 是Thought的直接结果。
LLM 在Thought里想清楚了 要调用什么工具、参数是什么 

## Observation (观察)
有结果出来之后  Agent接收工具返回的结果， 更新当前状态。

它的输入是   工具执行后返回的数据

observation 会发送给LLM  作为下一轮Thought的输入。 
状态更新了 
接下来调用book_flight

## Thought的本质是chain of Thought 

Thought 不是ReAct 发明的新东西， 而是Chain of Thought(Cot) 在Agent场景的应用。

Cot 是2022年 Google 提出的一种提示技术，核心思想是让LLM在回答问题前先写出**推理步骤**。
Roger 有5个网球， 他又买了2罐，每罐3个球， 他现在有多少个球？

推理步骤
Roger 原有5个， 买了2罐，每罐3个， 所以是2*3=6 加起来 5 + 6 = 11个
然后输出11个 

AIGC的特质是急于生成下一个token

LLM的推理能力不是 想清楚了再输出， 而是边输出边推理。 
当LLM被要求先写推理过程（约束）， 它在生成每个token的时候都在做推理，写完推理过程后，
最终答案自然对了。

## Thought 会不会浪费token
会， 但这是精度换成本的合理取舍。
一个典型的Thought 大约50-100 tokens 
一个5步的 Thought 消耗 250-500 tokens 
没有Thought, Agent错误率会显著提升 重试的成本可能会高于Thought. 


方案 A（无 Thought）：直接输出 Action，平均每个任务 4 步完成，每步 200 tokens（包括 prompt 和 response），总消耗 800 tokens。但错误率 25%，错了需要重试，重试平均 2 次，实际消耗 800 × 1.5 = 1200 tokens。

方案 B（有 Thought）：每步先输出 Thought 再输出 Action，平均每步 300 tokens（多了 100 tokens 的 Thought），总消耗 1200 tokens。但错误率只有 8%，几乎不需要重试，实际消耗就是 1200 tokens。

Thought 可调试性

## ReAct 和Cot 关系
Cot 只推理不行动 
ReAct 包含cot 推理之后还能执行。
Cot 是一种提示技术，用于提升LLM在复杂推理上的准确率。
他的输入是问题， 输出是推理过程加最终答案 全程是文本， 没有工具调用。

ReAct Agent执行框架， 用于让Agent完成需要多步工具调用的任务。
输入是任务， 输出是工具调用序列加最终答案。

比如"帮我查明天北京到上海的航班"，ReAct 的输出是"Thought: 需要调用 search_flight 工具 → Action: 调用工具 → Observation: 拿到结果 → Thought: 需要比价 → Action: 选择最便宜的 → 最终答案"。

ReAct 的Thoght 步骤借鉴了Cot的思想。    实际上是prompt
you should always think about what to do 

 prompt: `你是航班查询助手，严格按 ReAct 执行：Thought → Action → Observation`,