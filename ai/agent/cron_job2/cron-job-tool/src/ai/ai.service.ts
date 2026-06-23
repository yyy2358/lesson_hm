import { Injectable, Inject, Logger } from '@nestjs/common';
//可运行对象
import { Runnable } from '@langchain/core/runnables';
import {
    type AIMessageChunk,
    AIMessage,
    BaseMessage,
    HumanMessage,
    SystemMessage,
    ToolMessage,
} from '@langchain/core/messages';
import { ChatOpenAI } from '@langchain/openai';
//结构化工具 json 格式化(格式里包含声明的函数 描述 schema)  langchain提供的api
import { StructuredTool } from '@langchain/core/tools';

@Injectable()
export class AiService {
    private readonly logger = new Logger(AiService.name);
    private readonly modelWithTools:Runnable<BaseMessage[],AIMessage>;
    constructor(
        @Inject('CHAT_MODEL') model:ChatOpenAI,
        @Inject('CRON_JOB_TOOL')private readonly cronJobTool:StructuredTool,
        @Inject('TIME_NOW_TOOL')private readonly timeNowTool:StructuredTool,
        @Inject('DB_USERS_CRUD_TOOL')private readonly dbUsersCrudTool:StructuredTool,
        @Inject('SEND_MAIL_TOOL')private readonly sendMailTool:StructuredTool,
        @Inject('WEB_SEARCH_TOOL')private readonly webSearchTool:StructuredTool,//是在为注入进来的对象声明 类型
//确保拿到的这个对象具备工具该有的所有功能，方便在代码中安全地调用。
    ) {
        this.modelWithTools = model.bindTools([
            this.dbUsersCrudTool,
            this.webSearchTool,
            this.sendMailTool,
            this.timeNowTool,
            this.cronJobTool,
        ])
    }
    //流式输出的方法 生成器函数
    async *runChainStream(query:string): AsyncIterable<string> {
        const messages: BaseMessage[] = [
            new SystemMessage(`你是一个智能助手。以下是必须严格遵守的执行流程：

【流程：当用户要求"X秒后/分钟后做某事"时，严格按以下步骤执行】
第1步：先调用 time_now 获取服务器当前真实时间
第2步：根据 time_now 返回的真实时间，计算出"X秒后"的准确时间点
第3步：调用 cron_job 创建定时任务，参数必须如下：
  - type='at'
  - delayMs=延迟毫秒数（如10秒→10000，5分钟→300000）
  - 绝对不要填 at 字段！让服务器用 delayMs 自己算
  - instruction=纯任务内容（保留邮箱地址，去掉时间描述）
第4步：回复用户时，引用第2步算出的真实时间点，格式如"将在 2026-06-15 10:30:00 执行"

示例：用户说"10秒后给xx@qq.com发邮件提醒喝水"
→ 第1步: time_now() 返回 "2026-06-15T10:30:00Z"
→ 第2步: 计算 10:30:00 + 10秒 = 10:30:10
→ 第3步: cron_job(action='add', type='at', delayMs=10000, instruction='给xx@qq.com发送邮件，提醒喝水')
→ 第4步: 回复"已设置，将在 2026-06-15 10:30:10 给xx@qq.com发送邮件提醒喝水"

其他工具：
- web_search：搜索网页
- db_users_crud：数据库用户增删改查
- send_mail：立即发邮件（禁止在安排定时任务时调用！收件人必须从用户消息提取真实地址）

⚠️ 禁止事项：
- 禁止跳过 time_now 直接用你自己的内部时间
- 禁止在安排定时任务时同时调用 send_mail
- 禁止给 cron_job 填 at 字段，只能用 delayMs
- 禁止编造或使用示例邮箱地址`),
            new HumanMessage(query),
        ];
        let maxLoops = 10; // 安全阀：最多循环10轮
        while (maxLoops-- > 0) {
            //让AI开始流式回答
            let stream;
            try {
                this.logger.log(`调用LLM (流式)，剩余轮次: ${maxLoops}`);
                stream = await this.modelWithTools.stream(messages);
            } catch (err) {
                const msg = `LLM API 调用失败: ${(err as Error).message}`;
                this.logger.error(msg);
                yield `❌ ${msg}`;
                return;
            }
          //准备一个空盒子，用来把ai吐出的每一段文字拼起来
          let fullAIMessage: AIMessageChunk | null = null;
          try {
          //循环接收AI发来的每一小段内容
          for await (const chunk of stream as AsyncIterable<AIMessageChunk>) {
              fullAIMessage = fullAIMessage ? fullAIMessage.concat(chunk) : chunk;//拼接
              //判断是否存在工具调用
              //!! 双重否定就是肯定 确保一定是boolean 类型 强行转换
            const hasToolCallChunk = !!fullAIMessage.tool_call_chunks &&
            fullAIMessage.tool_call_chunks.length > 0;
            //push
            if(!hasToolCallChunk && chunk.content){
                yield chunk.content as string;
            }//如果不调用工具且有内容，就直接返回
          }
          } catch (streamErr) {
              const msg = `流式读取失败: ${(streamErr as Error).message}`;
              this.logger.error(msg);
              yield `❌ ${msg}`;
              return;
          }
          if(!fullAIMessage){
            return;
          }//如果没有内容，就直接返回
          messages.push(fullAIMessage);//把拼好的完整ai消息存到消息列表
          const toolCalls = fullAIMessage.tool_calls??[];
          if (!toolCalls.length){
            return;
          }//看是否有调用工具的指令 没有的话就return    不能有工具还return
          for (const toolCall of toolCalls){
            const toolCallId = toolCall.id;
            const toolName = toolCall.name;
            this.logger.log(`执行工具: ${toolName}`);
            try {
            if(toolName === 'db_users_crud'){
                const result = await this.dbUsersCrudTool.invoke(toolCall.args);
                messages.push(
                   new ToolMessage({
                    tool_call_id:toolCallId,
                    name:toolName,
                    content:result,
                   })
                )
            } else if(toolName === 'web_search'){
                const result = await this.webSearchTool.invoke(toolCall.args);
                messages.push(
                   new ToolMessage({
                    tool_call_id:toolCallId,
                    name:toolName,
                    content:result,
                   })
                )
            } else if(toolName === 'send_mail'){
                const result = await this.sendMailTool.invoke(toolCall.args);
                messages.push(
                   new ToolMessage({
                    tool_call_id:toolCallId,
                    name:toolName,
                    content:result,
                   })
                )
            } else if(toolName === 'time_now'){
                const result = await this.timeNowTool.invoke(toolCall.args??{});
                messages.push(
                   new ToolMessage({
                    tool_call_id:toolCallId,
                    name:toolName,
                    content:JSON.stringify(result),
                   })
                )
            }
            else if(toolName === 'cron_job'){
                const result = await this.cronJobTool.invoke(toolCall.args);
                messages.push(
                   new ToolMessage({
                    tool_call_id:toolCallId,
                    name:toolName,
                    content:result,
                   })
                )
            } else {
                this.logger.warn(`未知工具: ${toolName}`);
            }
            } catch (toolErr) {
                const errMsg = `工具 ${toolName} 执行失败: ${(toolErr as Error).message}`;
                this.logger.error(errMsg);
                messages.push(
                    new ToolMessage({
                        tool_call_id:toolCallId ?? '',
                        name:toolName,
                        content: errMsg,
                    })
                );
            }
          }
        }
    }
}

//{"message":"ENOENT: no such file or directory, stat 'E:\\workspace\\lesson_hm\\ai\\agent\\cron_job2\\cron-job-tool\\dist\\public\\index.html'","error":"Not Found","statusCode":404}