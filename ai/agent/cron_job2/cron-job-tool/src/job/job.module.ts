import { Module, forwardRef } from '@nestjs/common';
import { JobService } from './job.service';
import { ToolModule } from 'src/tool/tool.module';
import { JobAgentService } from '../ai/job-agent.service';

@Module({
  imports: [forwardRef(() => ToolModule)],//forwardRef() 用于解决循环依赖问题，确保 ToolModule 被正确导入,延迟导入
  providers: [JobService,JobAgentService],
  exports: [JobService],//导出JobService，方便其他模块使用
})
export class JobModule {}
