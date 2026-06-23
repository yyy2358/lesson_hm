import { Controller,Sse,Query } from '@nestjs/common';
import { AiService } from './ai.service';
//rxjs 流式响应 可观察对象
import { Observable,from } from 'rxjs';
//map 映射
import { map } from 'rxjs/operators';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Sse('chat/stream')
  chatStream(@Query('query')query:string):Observable<MessageEvent>{
    const stream = this.aiService.runChainStream(query);
    return from (stream)
    //将每个chunk转变为 前端适合解构的数据类型
    .pipe(map((chunk)=>({
      data:chunk,
    }))) as Observable<MessageEvent>//类型断言

   }
}
