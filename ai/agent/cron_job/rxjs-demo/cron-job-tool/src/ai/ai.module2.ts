import { Module } from '@nestjs/common';
import { AiService } from './ai.service2';
import { AiController } from './ai.controller';
import { ChatOpenAI } from '@langchain/openai';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AiController],
  providers: [
    AiService,
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
  ],
})
export class AiModule {}
//设计了一个动态的chatmodel
