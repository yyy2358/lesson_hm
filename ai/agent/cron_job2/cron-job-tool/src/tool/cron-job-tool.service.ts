import {
    Inject,
    Injectable
} from '@nestjs/common';
import {
    tool
} from '@langchain/core/tools';
import {z} from 'zod';
import { JobService } from 'src/job/job.service';

@Injectable()
export class CronJobToolService {
    readonly tool;

    @Inject(JobService)
    private readonly jobService:JobService;

    constructor() {
        const cronJobArgsSchema = z.object({
           action:
             z.enum(['list','add','toggle'])
             .describe('要执行的操作：list、add、toggle'),
            id:
             z.string().optional().describe('任务ID，（toggle时需要）'),
            enabled:z.boolean().optional().describe('是否启用，（toggle可选：不传则自动取反）'),
            type: z.enum(['cron','every','at'])
                .optional().describe(`任务类型(add时需要)：
                    - at: 在指定时间点执行一次，执行后自动停用。用于"X秒后/XX分钟后/XX时间后"这类一次性延迟任务
                    - every: 按固定间隔毫秒循环执行，永不自动停止。用于"每X秒/每X分钟/每隔XX"这类重复任务
                    - cron: 按Cron表达式循环执行。用于"每天X点/每周X"这类规律时间任务`),
            instruction: z.string().optional().describe(`任务说明/指令(add时需要)。
                要求：
                1) 只保留"要做什么"的纯任务内容，必须去掉时间/频率描述
                2) 必须是自然语言描述，不能是工具调用或代码
                3) 必须保留用户消息中的邮箱地址、姓名等关键信息
                4) 例如：用户说"10秒后给xx@qq.com发邮件提醒喝水" → instruction="给xx@qq.com发送邮件，提醒喝水"
                5) 例如：用户说"每5分钟查询一次天气" → instruction="查询一次天气"`),
            cron: z.string().optional().describe('Cron表达式(type=cron时需要,例如*/5 * * * * *）'),
            everyMs:z.number().int().positive().optional().describe('固定间隔毫秒(type=every时需要,例如 60000 表示每分钟执行一次)'),
            delayMs: z.number().int().positive().optional()
                .describe(`【type=at时必须使用】延迟毫秒数。服务器用真实时钟计算执行时间。例如"10秒后"→delayMs=10000，"5分钟后"→delayMs=300000。这是唯一正确的方式，禁止使用at字段`),
            at: z.string().optional().describe('【已废弃，禁止使用】请用delayMs代替。此字段仅供兼容旧数据'),
        });
        this.tool = tool(
            async({
                action,
                id,
                enabled,
                type,
                instruction,
                cron,
                everyMs,
                delayMs,
                at,
            }:{
                action:'list'|'add'|'toggle';
                id?:string;
                enabled?:boolean;
                type?:'cron'|'every'|'at';
                instruction?:string;
                cron?:string;
                everyMs?:number;
                delayMs?:number;
                at?:string;
            }) =>  {
                switch (action) {//根据操作执行不同逻辑
                    case 'list': {
                      const jobs = await this.jobService.listJobs();
                      if (!jobs.length) return '当前没有任何定时任务。';
                      const lines = jobs
                        .map((j: any) => {
                          return `id=${j.id} type=${j.type} enabled=${j.isEnabled} running=${j.running} cron=${j.cron ?? ''} everyMs=${j.everyMs ?? ''} at=${j.at instanceof Date ? j.at.toISOString() : j.at ?? ''} instruction=${j.instruction ?? ''}`;
                        })
                        .join('\n');
                      return `当前定时任务列表（type 说明：cron=按表达式循环；every=按间隔循环；at=到点执行一次后自动停用）：\n${lines}`;
                    }
                    case 'add': {
                      if (!type) return '新增任务需要提供 type（cron/every/at）。';
                      if (!instruction) return '新增任务需要提供 instruction。';

                      if (type === 'cron') {
                        if (!cron) return 'type=cron 时需要提供 cron。';
                        const created = await this.jobService.addJob({
                          type,
                          instruction,
                          cron,
                          isEnabled: true,
                        });
                        return `已新增定时任务：id=${(created as any).id} type=cron cron=${(created as any).cron} enabled=${(created as any).isEnabled}`;
                      }

                      if (type === 'every') {
                        if (typeof everyMs !== 'number' || everyMs <= 0) {
                          return 'type=every 时需要提供 everyMs（正整数，单位毫秒）。';
                        }
                        const created = await this.jobService.addJob({
                          type,
                          instruction,
                          everyMs,
                          isEnabled: true,
                        });
                        return `已新增定时任务：id=${(created as any).id} type=every everyMs=${(created as any).everyMs} enabled=${(created as any).isEnabled}`;
                      }

                      if (type === 'at') {
                        // 服务器自己计算准确时间，不依赖AI提供的时间
                        let executeAt: Date;
                        if (typeof delayMs === 'number' && delayMs > 0) {
                          // 用服务器时间 + 延迟 = 准确执行时间
                          executeAt = new Date(Date.now() + delayMs);
                        } else if (at) {
                          // 兼容旧的 at 参数方式
                          executeAt = new Date(at);
                          if (Number.isNaN(executeAt.getTime())) {
                            return 'type=at 的 at 不是合法的 ISO 时间字符串。';
                          }
                        } else {
                          return 'type=at 时需要提供 delayMs（延迟毫秒数）或 at（ISO 时间字符串）。推荐使用 delayMs。';
                        }
                        const created = await this.jobService.addJob({
                          type,
                          instruction,
                          at: executeAt,
                          isEnabled: true,
                        });
                        const actualAt = (created as any).at instanceof Date
                          ? (created as any).at.toISOString()
                          : String(executeAt.toISOString());
                        // 返回服务器计算的真实时间，AI可以直接引用
                        return `已新增定时任务：id=${(created as any).id} type=at 执行时间=${actualAt}（服务器真实时间） enabled=${(created as any).isEnabled}`;
                      }

                      return `不支持的任务类型: ${type}`;
                    }
                    case 'toggle': {
                      if (!id) return 'toggle 任务需要提供 id。';
                      const updated = await this.jobService.toggleJob(id, enabled);
                      return `已更新任务状态：id=${(updated as any).id} enabled=${(updated as any).isEnabled}`;
                    }
                    default:
                      return `不支持的操作: ${action}`;
                  }

            },
            {
                 name: 'cron_job',
                description: `管理服务端定时任务（支持 list/add/toggle）。

⚠️ 类型选择口诀（必须严格遵守）：
- "X秒后/分钟后/小时后/XX之后做Y" → type='at'（一次性延迟任务，执行完自动停用）
- "每X秒/每隔X分钟/每X小时做Y" → type='every'（循环重复任务）
- "每天X点/每周X/每月X号做Y" → type='cron'（cron表达式循环任务）

类型语义：
- type=at：到指定时间点只执行一次，执行后自动停用（isEnabled自动变false）
- type=every：按固定毫秒间隔循环执行（永远不自动停止，需手动toggle关闭）
- type=cron：按 Cron 表达式循环执行（永远不自动停止，需手动toggle关闭）

🚨 时间计算：对type=at必须使用delayMs参数（例如10秒→delayMs=10000），服务器会用自己的真实时钟计算准确执行时间。绝对不要自己计算ISO时间字符串填到at字段。`,
                schema: cronJobArgsSchema
            }
        )
    }
}