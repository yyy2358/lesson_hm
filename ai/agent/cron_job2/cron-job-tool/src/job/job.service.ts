import { 
    Injectable,
    Inject,
    Logger,//日志
    OnApplicationBootstrap,//应用启动时执行  引入时间表达式常量
    NotFoundException,//未找到异常类
} from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
//实体管理器 是typeorm提供的数据库操作核心管理器 可直接执行增删改查与原生sql
import { EntityManager } from 'typeorm';
import { Job } from './entities/job.entity';
import { JobAgentService } from '../ai/job-agent.service';

@Injectable()
export class JobService implements OnApplicationBootstrap {
  private readonly logger = new Logger(JobService.name);
    
  @Inject(EntityManager)
    private readonly entityManager: EntityManager;
    @Inject(SchedulerRegistry)//注册
    private readonly schedulerRegistry: SchedulerRegistry;
    @Inject(JobAgentService)
    private readonly jobAgentService: JobAgentService;
    //生命周期
  async onApplicationBootstrap() {
    //启动所有的定时任务
     const enabledJobs = await this.entityManager.find(Job, {
            where: { isEnabled: true },//查询所有启用的定时任务 不是业务级别的是系统级别的
        });
        const cronJobs = this.schedulerRegistry.getCronJobs();
        const intervals = this.schedulerRegistry.getIntervals();
        const timeouts = this.schedulerRegistry.getTimeouts();
    
        for (const job of enabledJobs) {
            const alreadyRegistered =
                (job.type === 'cron' && cronJobs.has(job.id)) ||//key value结构
                (job.type === 'every' && intervals.includes(job.id)) ||
                (job.type === 'at' && timeouts.includes(job.id));
            if (alreadyRegistered) continue;
        
            await this.startRunTime(job);
        }
  }
  
  async addJob(
    input:
    | {type:'cron';instruction:string;cron:string;isEnabled?:boolean}
    | {type:'every';instruction:string;everyMs:number;isEnabled?:boolean}
    | {type:'at';instruction:string;at:Date;isEnabled?:boolean}
  ) {
    const entity = this.entityManager.create(Job,{
        instruction:input.instruction,
        type:input.type,
        cron:input.type === 'cron' ? input.cron : null,
        everyMs:input.type === 'every' ? input.everyMs : null,
        at:input.type === 'at' ? input.at : null,
        isEnabled:input.isEnabled ?? true,//空值合并运算符 input.isEnabled为null/undefined时返回true其他值原样保留
        lastRunTime:null
    });
    const saved = await this.entityManager.save(Job,entity);
    if (saved.isEnabled) {
        await this.startRunTime(saved);
    }
    return saved;
  }
   async listJobs() {
        const jobs = await this.entityManager.find(Job, {
          order: { createdAt: 'DESC' },
        });
    
        const cronJobs = this.schedulerRegistry.getCronJobs();
        const intervalNames = this.schedulerRegistry.getIntervals();
        const timeoutNames = this.schedulerRegistry.getTimeouts();
    
        return jobs.map((job) => {
          const running =
            job.isEnabled &&
            ((job.type === 'cron' && cronJobs.has(job.id)) ||
              (job.type === 'every' && intervalNames.includes(job.id)) ||
              (job.type === 'at' && timeoutNames.includes(job.id)));
    
          return {
            ...job,
            running,
          };
        });
      }
    async toggleJob(jobId: string, enabled?: boolean) {
        const job = await this.entityManager.findOne(Job, { where: { id: jobId } });
        if (!job) throw new NotFoundException(`Job not found: ${jobId}`);

        const nextEnabled = enabled ?? !job.isEnabled;
        if (job.isEnabled !== nextEnabled) {
            job.isEnabled = nextEnabled;
            await this.entityManager.save(Job, job);
        }

        if (job.isEnabled) {
            await this.startRunTime(job);
        } else {
            this.stopRunTime(job);
        }

        return job;
    }

    private stopRunTime(job: Job) {
        if (job.type === 'cron') {
          const cronJobs = this.schedulerRegistry.getCronJobs();
          const runtimeJob = cronJobs.get(job.id);
          if (runtimeJob) runtimeJob.stop();
          return;
        }
    
        if (job.type === 'every') {
          try {
            this.schedulerRegistry.deleteInterval(job.id);
          } catch {
            // ignore
          }
          return;
        }
    
        if (job.type === 'at') {
          try {
            this.schedulerRegistry.deleteTimeout(job.id);
          } catch {
            // ignore
          }
          return;
        }
      }

//隐藏这个类的细节
  private async startRunTime(job: Job) {
    if (job.type === 'cron') {
      const cronJobs = this.schedulerRegistry.getCronJobs();//获得所有cron job
      const existing = cronJobs.get(job.id);
      //如果存在，表示注册了
      if (existing) {
        existing.start();
        return ;
      }
      const runtimeJob = this.createCronJob(job);
      this.schedulerRegistry.addCronJob(job.id,runtimeJob);
    }
     if (job.type === 'every') {
            const names = this.schedulerRegistry.getIntervals();
            if (names.includes(job.id)) return;
      
            if (typeof job.everyMs !== 'number' || job.everyMs <= 0) {
              throw new Error(`Invalid everyMs for job ${job.id}`);
            }
      
            const ref = setInterval(async () => {
              this.logger.log(`run job ${job.id}, ${job.instruction}`); // 打印日志
              await this.entityManager.update(Job, job.id, { lastRunTime: new Date() });
      
              try {
                const result = await this.jobAgentService.runJob(job.instruction);
                this.logger.log(`[job ${job.id}] ${result}`);
              } catch (e) {
                this.logger.error(
                  `job ${job.id} agent execution error: ${(e as Error).message}`,
                );
              }
            }, job.everyMs);
      
            this.schedulerRegistry.addInterval(job.id, ref);
            return;
          }
      
          if (job.type === 'at') {
            const names = this.schedulerRegistry.getTimeouts();
            if (names.includes(job.id)) return;
      
            if (!job.at) {
              throw new Error(`Invalid at for job ${job.id}`);
            }
      
            const delay = Math.max(0, job.at.getTime() - Date.now());
            const ref = setTimeout(async () => {
              this.logger.log(`run job ${job.id}, ${job.instruction}`);
              await this.entityManager.update(Job, job.id, {
                lastRunTime: new Date(),
                isEnabled: false, // at 类型只执行一次：执行完自动停用
              });
      
              try {
                const result = await this.jobAgentService.runJob(job.instruction);
                this.logger.log(`[job ${job.id}] ${result}`);
              } catch (e) {
                this.logger.error(
                  `job ${job.id} agent execution error: ${(e as Error).message}`,
                );
              }
      
              try {
                this.schedulerRegistry.deleteTimeout(job.id);
              } catch {
                // ignore
              }
            }, delay);
      
            this.schedulerRegistry.addTimeout(job.id, ref);
            return;
          }
  }
  private createCronJob(job:Job) {
    //cron 表达式
    const cronExpr = job.cron ?? '';

    return new CronJob(cronExpr,async () =>{
        //日志记录启动定时器脚本
      this.logger.log(`run job ${job.instruction}`);
      await this.entityManager.update(Job,job.id,{lastRunTime:new Date()});
       try {
                const result = await this.jobAgentService.runJob(job.instruction);
                this.logger.log(`[job ${job.id}] ${result}`);
            } catch (e) {
                this.logger.error(
                `job ${job.id} agent execution error: ${(e as Error).message}`,
                );
            }
    });
  }
}
