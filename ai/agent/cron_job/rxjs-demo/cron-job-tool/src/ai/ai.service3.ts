import { Injectable, Inject } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { Runnable } from '@langchain/core/runnables';
import {
  BaseMessage,
  AIMessage,
  SystemMessage,
  HumanMessage,
  ToolMessage,
  AIMessageChunk,
} from '@langchain/core/messages';

@Injectable()
export class AiService {
  //Runnable 是langchain中的一个接口 表示一个可运行的对象 invoke一下就可以进行
  //BaseMessage[] 是langchain中的一个基类，表示一个消息数组
  //AIMessage HumanMessage TollMessage 是langchain中的一个子类 表示一个消息
  //输入的类型约束 BaseMessage[] 输出的类型约束AIMessage
  private readonly modelWithTools: Runnable<BaseMessage[], AIMessage>;
  //将llm 和业务逻辑分离   llm变化太快
  //注入了 provide的model
  constructor(
    @Inject('CHAT_MODEL') model: ChatOpenAI, //静态属性
    @Inject('QUERY_USER_TOOL') private readonly queryUserTool: any, //私有属性用this
  ) {
    this.modelWithTools = model.bindTools([this.queryUserTool]);
  }
  //同步调用 llm 完全生成后再返回
  //  async runChain(query:string): Promise<string>{
  //     return query;
  // }
  //可执行的由langchain的流式输出的接口服务
  //流式调用 llm 边生成边返回   可迭代的
  //generator 生成器函数
  async *runChainStream(query: string): AsyncIterable<string> {
    const messages: BaseMessage[] = [
      new SystemMessage(`你是一个智能助手，可以在需要是调用工具如（query_user)
                来查询用户信息，再用结果回答用户的问题`),
      new HumanMessage(query),
    ];
    //agent loop
    while (true) {
      //stream流式生成
      const stream = await this.modelWithTools.stream(messages);
      let fullAIMessage: AIMessageChunk | null = null;
      //解析stream吐出来的每个chunk 达到yield效果
      //as 类型断言 chunk是异步的可迭代的chunk  类型为AIMessageChunk
      for await (const chunk of stream as AsyncIterable<AIMessageChunk>) {
        fullAIMessage = fullAIMessage ? fullAIMessage.concat(chunk) : chunk;
        //判断是否存在工具调用
        const hasToolCallChunk =
          !!fullAIMessage.tool_call_chunks &&
          fullAIMessage.tool_call_chunks.length > 0;
        if (!hasToolCallChunk && chunk.content) {
          yield chunk.content as string;
        } //不包含工具调用的chunk 才返回 有tool的还要用toolmessage
      } //concat 连接起来
      if (!fullAIMessage) {
        return;
      }
      //stream ，chunk 且不是tool   yield  直接返回
      //stream 结束，是一条完整的AIMessage
      messages.push(fullAIMessage);
      //?? 空值合并运算符   es6特性
      const toolCalls = fullAIMessage.tool_calls ?? [];
      if (!toolCalls.length) {
        return;
      }
      for (const toolCall of toolCalls) {
        const toolCallId = toolCall.id || '';
        const toolName = toolCall.name;
        if (toolName === 'query_user') {
          const result = await this.queryUserTool.invoke(toolCall.args);
          //工具调用 toolmessage存起来
          messages.push(
            new ToolMessage({
              content: result,
              name: toolName,
              tool_call_id: toolCallId,
            }),
          );
        }
      }
      //chunk结束不代表loop结束
    }
  }
}
//agent loop
