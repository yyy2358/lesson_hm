//获取当前时间
import { Injectable } from '@nestjs/common';
import { tool } from '@langchain/core/tools';
import { z } from 'zod';

@Injectable()
export class TimeNowToolService {
  readonly tool;
  constructor(){
    const timeNowSchema = z.object({
      format: z
        .enum(['iso', 'timestamp', 'full'])
        .optional()
        .default('full')
        .describe('返回格式：iso=ISO字符串，timestamp=毫秒时间戳，full=完整信息（默认）'),
    });

    this.tool = tool(
        async ({ format }: { format?: 'iso' | 'timestamp' | 'full' }) => {
            const now = new Date();
            const iso = now.toISOString();
            const ts = now.getTime();
            if (format === 'iso') return { iso };
            if (format === 'timestamp') return { timestamp: ts };
            return {
                iso,
                timestamp: ts,
                localString: now.toString(),
                timezoneOffset: now.getTimezoneOffset(),
            };
        },{
            name:'time_now',
            description:'获取当前服务器时间，支持选择返回格式（iso/timestamp/full）',
            schema: timeNowSchema,
        }
    )
  }
}