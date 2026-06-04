import { Module } from '@nestjs/common';
import { AiService } from './ai.service3';
import { AiController } from './ai.controller';
import { ChatOpenAI } from '@langchain/openai';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { z } from 'zod';
import { tool } from '@langchain/core/tools';

@Module({
  controllers: [AiController],
  providers: [
    AiService,
    UserService,
    //provide 动态创建的 自动生成的AiService 是个固定的 有文件
    //将model 从逻辑中剥离出来  让他成为一种服务 要用的时候注入就可以了
    //llm 实例作为provide来提供
    {
      provide: 'CHAT_MODEL',
      //工厂模式，车，摩托车，坦克
      useFactory: (configService: ConfigService) => {
        return new ChatOpenAI({
          apiKey: configService.get('OPENAI_API_KEY'),
          model: configService.get('MODEL_NAME'),
          configuration: {
            baseURL: configService.get('OPENAI_BASE_URL'),
          },
        });
      }, //会接收一个你注入的模块 就可以拿到在.env中的模型名字
      inject: [ConfigService],
    },
    {
      provide: 'QUERY_USER_TOOL',
      useFactory: (userService: UserService) => {
        const queryUserArgsSchema = z.object({
          userId: z.string().describe('用户ID，例如：001，002，003'),
        }); //tool跟service解耦
        return tool(
          async ({ userId }: { userId: string }) => {
            const user = userService.findOne(userId);
            if (!user) {
              const availableIds = userService
                .findAll()
                .map((u) => u.id)
                .join(',');
              return `用户${userId}不存在。可用的ID: ${availableIds}`;
            }
            return `用户信息：\n- ID: ${user.id} \n- 姓名：${user.name}
                    \n- 邮箱: ${user.email}\n- 角色 ${user.role}
                    `;
          },
          {
            name: 'query_user',
            description: `查询数据库中的用户信息。输入用户ID，
                    返回该用户的详细信息（姓名、邮箱、角色）`,
            schema: queryUserArgsSchema,
          },
        );
      },
      inject: [UserService], //依赖于UserService
    },
  ],
})
export class AiModule {}
//设计了一个动态的chatmodel
