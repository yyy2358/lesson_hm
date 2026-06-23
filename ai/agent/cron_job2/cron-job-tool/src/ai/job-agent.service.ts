import {
    Inject,
    Injectable,
    Logger
} from '@nestjs/common';
import {
    ChatOpenAI
} from '@langchain/openai';
import { Runnable } from '@langchain/core/runnables';
import {
    BaseMessage,
    AIMessage,
    HumanMessage,
    SystemMessage,
    ToolMessage
} from '@langchain/core/messages';


@Injectable()
export class JobAgentService {
    private readonly logger = new Logger(JobAgentService.name);//类名本身
    private readonly modelWithTools: Runnable<BaseMessage[], AIMessage>;

    constructor(
        @Inject('CHAT_MODEL') model: ChatOpenAI,
        @Inject('SEND_MAIL_TOOL') private readonly sendMailTool: any,
        @Inject('TIME_NOW_TOOL') private readonly timeNowTool: any,
        @Inject('WEB_SEARCH_TOOL') private readonly webSearchTool: any,
        @Inject('DB_USERS_CRUD_TOOL') private readonly dbUsersCrudTool: any,
    ) {
        this.modelWithTools = model.bindTools([
            this.sendMailTool,
            this.timeNowTool,
            this.webSearchTool,
            this.dbUsersCrudTool
        ]);
    }

    async runJob(instruction: string): Promise<string> {
        const messages: BaseMessage[] = [
          new SystemMessage(
            '你是一个后台任务执行代理。你的职责是：根据收到的任务指令，调用必要的工具（send_mail、web_search、db_users_crud、time_now）来完成任务，然后返回简洁的执行结果。注意：你只负责执行当前这一次任务，不要创建新的定时任务，不要做多余的事情。',
          ),
          new HumanMessage(instruction),
        ];

        while (true) {
            let aiMessage: AIMessage;
            try {
              aiMessage = await this.modelWithTools.invoke(messages);
            } catch (err) {
              const msg = `JobAgent LLM调用失败: ${(err as Error).message}`;
              this.logger.error(msg);
              return `❌ ${msg}`;
            }
            messages.push(aiMessage);

            const toolCalls = aiMessage.tool_calls ?? [];

            if (!toolCalls.length) {
              return String(aiMessage.content ?? '');
            }

            for (const toolCall of toolCalls) {
              const toolCallId = toolCall.id || '';
              const toolName = toolCall.name;

              try {
                if (toolName === 'send_mail') {
                  const result = await this.sendMailTool.invoke(toolCall.args);
                  messages.push(
                    new ToolMessage({
                      tool_call_id: toolCallId,
                      name: toolName,
                      content: result,
                    }),
                  );
                } else if (toolName === 'web_search') {
                  const result = await this.webSearchTool.invoke(toolCall.args);
                  messages.push(
                    new ToolMessage({
                      tool_call_id: toolCallId,
                      name: toolName,
                      content: result,
                    }),
                  );
                } else if (toolName === 'db_users_crud') {
                  const result = await this.dbUsersCrudTool.invoke(toolCall.args);
                  messages.push(
                    new ToolMessage({
                      tool_call_id: toolCallId,
                      name: toolName,
                      content: result,
                    }),
                  );
                } else if (toolName === 'time_now') {
                  const result = await this.timeNowTool.invoke(toolCall.args ?? {});
                  messages.push(
                    new ToolMessage({
                      tool_call_id: toolCallId,
                      name: toolName,
                      content: JSON.stringify(result),
                    }),
                  );
                } else {
                  this.logger.warn(`未知工具调用: ${toolName}`);
                }
              } catch (toolErr) {
                const errMsg = `工具 ${toolName} 执行失败: ${(toolErr as Error).message}`;
                this.logger.error(errMsg);
                messages.push(
                  new ToolMessage({
                    tool_call_id: toolCallId,
                    name: toolName,
                    content: errMsg,
                  }),
                );
              }
            }
          }
      }
}