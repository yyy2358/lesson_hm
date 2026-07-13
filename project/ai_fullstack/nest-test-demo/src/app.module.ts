import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { DatabaseModule } from './database/database.module';

// mvc 设计模式 模型-视图-控制器
// 一个文件一个类
// 装饰器模式 让AppModule类成为一个模块
@Module({
  imports: [
    TodosModule,
    DatabaseModule
  ],
  // 后端路由 控制逻辑 参数校验 逻辑处理
  controllers: [AppController],
  // 后端服务 数据库操作 业务逻辑
  // 数据
  providers: [AppService],
})
export class AppModule{}