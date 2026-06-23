//独立于tool 可以被任何地方inject
import {
    Inject,//注入依赖
    Injectable, //可注入 注入服务
    Logger,
} from '@nestjs/common';
import {
    ConfigService
} from '@nestjs/config';//全局配置服务
import { ChatOpenAI } from '@langchain/openai';

@Injectable()
export class LLMService {
    private readonly logger = new Logger(LLMService.name);

    @Inject(ConfigService)
    private readonly configService: ConfigService;

    getModel() : ChatOpenAI {
        const modelName = this.configService.get('MODEL_NAME');
        const baseURL = this.configService.get('OPENAI_BASE_URL');
        this.logger.log(`初始化模型: ${modelName}, baseURL: ${baseURL}`);

        return new ChatOpenAI({
            model: modelName,
            apiKey: this.configService.get('OPENAI_API_KEY'),
            temperature: 0.1,           // 降低随机性，让工具调用更稳定
            maxRetries: 2,              // 失败重试2次
            timeout: 30000,             // 30秒超时
            configuration: {
                baseURL: baseURL,
            },
        });
    }
}