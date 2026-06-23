import { Module, forwardRef } from '@nestjs/common';
import { LLMService } from './llm.service';
import { WebSearchToolService } from './web-search-tool.service';
import { DbUsersCrudToolService } from './db-users-crud-tool.service';
import { UsersModule } from '../users/users.module';
import { SendMailToolService } from './send-mail-tool.service';
import { TimeNowToolService } from './time-now-tool.service';
import { CronJobToolService } from './cron-job-tool.service';
import { JobModule } from '../job/job.module';

//声明向外提供哪些东西
@Module({
    imports:[UsersModule, forwardRef(() => JobModule)],
    providers:[
        LLMService,//提供llm服务
        DbUsersCrudToolService,//提供db用户crud服务
        WebSearchToolService,//提供web搜索服务
        SendMailToolService,//提供发送邮件服务
        TimeNowToolService,//提供获取当前时间服务
        CronJobToolService,//提供定时任务工具服务
        {
            provide:'DB_USERS_CRUD_TOOL',
            useFactory:(dbUsersCrudToolService:DbUsersCrudToolService)=>dbUsersCrudToolService.tool,
            inject:[DbUsersCrudToolService],
        },
        {//自定义注入项
            provide:'WEB_SEARCH_TOOL',
            useFactory:(webSearchToolService:WebSearchToolService)=>webSearchToolService.tool,//拿到这个tool，会成为modelwithtool的一部分
            inject:[WebSearchToolService],
        },
        {//自定义的注入项
            provide: 'CHAT_MODEL',
            useFactory:(llmService:LLMService)=>llmService.getModel(),
            inject:[LLMService],
        },
        {//自定义的注入项     把service变成tool对象
            provide:'SEND_MAIL_TOOL',
            useFactory:(sendMailToolService:SendMailToolService)=>sendMailToolService.tool,
            inject:[SendMailToolService],
        },
        {
            provide:'TIME_NOW_TOOL',
            useFactory:(timeNowToolService:TimeNowToolService)=>timeNowToolService.tool,
            inject:[TimeNowToolService],
        },
        {
            provide:'CRON_JOB_TOOL',
            useFactory:(cronJobToolService:CronJobToolService)=>cronJobToolService.tool,
            inject:[CronJobToolService],
        },
    ],
    exports:[//向外输出自定义注入项  在服务中使用
        'CHAT_MODEL',
        'WEB_SEARCH_TOOL',
        'SEND_MAIL_TOOL',
        'DB_USERS_CRUD_TOOL',
        'TIME_NOW_TOOL',
        'CRON_JOB_TOOL',
    ],
})
export class ToolModule {}
