import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AIModule } from './ai/ai.module';

@Module({
  // PrismaModule prisma 命令行的方式， client 代表数据库
  imports: [
    PostsModule, PrismaModule, 
    UserModule, AuthModule, AIModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
