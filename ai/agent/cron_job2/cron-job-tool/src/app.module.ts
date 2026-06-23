import { Module,OnApplicationBootstrap,Inject } from '@nestjs/common';//生命周期钩子 应用启动后执行  启动定时任务
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';//引入用户模块
import { User } from './users/entities/user.entity';
import { AiModule } from './ai/ai.module';
import { ServeStaticModule } from '@nestjs/serve-static';//引入静态文件模块  用于提供静态文件服务
import { join } from 'path';
//定时任务
import { CronJob } from 'cron';
//nestjs 定时任务
import {
   CronExpression,//定时时间表达式
  ScheduleModule,//定时任务模块
  SchedulerRegistry //定时任务注册表
} from '@nestjs/schedule';
//定时任务服务
import { JobModule } from './job/job.module';
//引入定时任务实体
import { Job } from './job/entities/job.entity';
import { ToolModule } from './tool/tool.module';
import {
  ConfigService,
  ConfigModule,
} from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';//全局配置文件 都要在这里配置
//引入配置模块
@Module({
  imports: [
    ServeStaticModule.forRoot({
      //  rootPath:join(__dirname,'..','public'),
      rootPath:join(process.cwd(),'public'),
    }),//配置静态文件服务
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'.env',
    }),
    MailerModule.forRootAsync({//异步配置 先等待依赖注入 动态返回配置
      inject:[ConfigService],
      useFactory:(configService:ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'),
          port:Number(configService.get<string>('MAIL_PORT')),
          secure:configService.get<string>('MAIL_SECURE')==='true',
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASSWORD'),
          }
        },
        defaults: {
          from: configService.get<string>('MAIL_FROM'),
        },
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(configService:ConfigService) => ({
      type: 'mysql',//默认走mysql2驱动了 不需再声明
      host: configService.get<string>('MYSQL_HOST'),
      port: Number(configService.get<string>('MYSQL_PORT')),
      username: configService.get<string>('MYSQL_USER'),
      password: configService.get<string>('MYSQL_PASSWORD'),
      database: configService.get<string>('MYSQL_DATABASE'),
      synchronize: true,//自动同步数据库
      logging: process.env['NODE_ENV'] === 'development',//生产环境下关闭sql日志
      entities:[User,Job],//引入用户实体
      })
    }),
    UsersModule,
    AiModule,
    ScheduleModule.forRoot(),
    ToolModule,//全局引入
  ],//引入动态声明的一个模块
  controllers: [AppController],
  providers: [AppService],
})
//强制类必须实现接口里规定的方法 implements表示实现接口 extends是继承
export class AppModule implements OnApplicationBootstrap {
  @Inject(SchedulerRegistry)
    schedulerRegistry: SchedulerRegistry;//声明类里面的属性
  async onApplicationBootstrap() {
    
  }//模块初始化完毕启动  引入时间表达式常量
}

