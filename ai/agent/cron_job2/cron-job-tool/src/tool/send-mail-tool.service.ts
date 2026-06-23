import {
    Inject,//注入依赖
    Injectable //可注入 注入服务
} from '@nestjs/common';
import {
    ConfigService
} from '@nestjs/config';//全局配置服务
import { 
    MailerService
} from '@nestjs-modules/mailer';
import { tool } from '@langchain/core/tools';
import { z } from 'zod';

@Injectable()
export class SendMailToolService {
    readonly tool ;
    
    @Inject(MailerService)
    private mailerService: MailerService;

    @Inject(ConfigService)
    private configService: ConfigService;

    constructor(){
        const sendMailArgsSchema = z.object({
            to:z.string().describe('收件人邮箱地址，必须从用户消息或任务指令中提取真实邮箱，禁止使用示例或编造邮箱'),
            subject:z.string().describe('邮件主题'),
            text:z.string().optional().describe('纯文本内容，可选'),
            html:z.string().optional().describe('HTML内容，可选'),
        });

        this.tool = tool(//每个toolservice就是返回tool的定义 包含tool被选中之后执行的功能 结果会return给aiservice模块增强大模型聊天的内容
             async ({
                to,
                subject,
                text,
                html,
             }:{
                to:string;
                subject:string;
                text?:string;
                html?:string;
             }) => {
                //从配置项拿邮箱配置
                const fallbackFrom = this.configService.get<string>('MAIL_FROM');
                await this.mailerService.sendMail({
                    to,
                    subject,
                    text:text ?? '(无纯文本内容)',
                    html:html ?? `<P>${text ?? '(无HTML内容)'} </P>`,
                    from:fallbackFrom,
                });
                return `邮件发送成功，收件人：${to}，主题：${subject}`
            },
            {
                name:'send_mail',
                description:'发送电子邮件，需要提供收件人邮箱、主题，可选文本内容和HTML内容',
                schema:sendMailArgsSchema,
            }
        )
    }
}