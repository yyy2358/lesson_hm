import { Controller, Get, Query, Sse } from '@nestjs/common';
import { AiService } from './ai.service';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  //   @Get('chat')
  //  async chat(@Query('query') query:string){
  //   const answer = await this.aiService.runChain(query)
  //   return {
  //     answer
  //   }
  //   }
  //装饰器模式   流式输出满分点
  //Server Sent Events
  //Content-Type: text/event-stream  响应头
  //Cache-Control: no-cache 别缓存
  //Connection: keep-alive 保持连接不关闭
  //Transfer-Encoding: chunked 分块传输 数据块的传输

  @Sse('chat/stream')
  chatStream(@Query('query') query: string): Observable<MessageEvent> {
    const stream = this.aiService.runChainStream(query);
    //将llm的stream 转换为 observable对象
    return from(stream).pipe(
      map((chunk) => ({
        data: chunk,
      })), //sse service给我一个token 先用from变成可观察的对象 然后.pipe送到管道里 用map处理
      //前端需要的chunk的格式约定
    ) as Observable<MessageEvent>;
  }
}
