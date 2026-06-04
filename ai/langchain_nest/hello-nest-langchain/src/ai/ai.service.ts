import { Injectable,Inject } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';//prompt 模板s
import { StringOutputParser } from '@langchain/core/output_parsers';//约束输出的格式
import type { Runnable } from '@langchain/core/runnables';//可运行的序列
import { ConfigService } from '@nestjs/config';//配置服务

@Injectable()
export class AiService {
    // 声明了链式调用对象 私有的  只读
    private readonly chain: Runnable;

    constructor(@Inject(ConfigService) configService: ConfigService) {
        const prompt = PromptTemplate.fromTemplate(
            ` 请回答以下问题：\n\n{query}
            `
        );//模板 占位符是query 进行参数的传递
        const model = new ChatOpenAI({
            temperature: 0.7,
            modelName: configService.get('MODEL_NAME'),
            apiKey: configService.get('OPENAI_API_KEY'),
            configuration: {
                baseURL: configService.get('OPENAI_BASE_URL')
            }
        })
        this.chain = prompt.pipe(model).pipe(new StringOutputParser());//约束响应结果 从一个节点到另一个节点
    }
    async runChain(query: string): Promise<string> {
        return this.chain.invoke({ query });
    }
}
