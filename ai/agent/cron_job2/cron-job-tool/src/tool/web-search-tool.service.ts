import { 
    Injectable,
    Inject
 } from '@nestjs/common';
import{ 
    ConfigService
} from '@nestjs/config';
import {
    tool
} from'@langchain/core/tools';
import { z } from 'zod';//使用zod定义入参校验规则与数据结构，约束工具入参类型、范围并生成参数描述。

@Injectable()
export class WebSearchToolService {
    readonly tool;

    @Inject(ConfigService)
    private readonly configService: ConfigService;

    constructor(){
        //tool的声明
       const webSearchArgsSchema = z.object({
        query:z.string().min(1).describe('搜索关键词，例如：公司年报、某个事件'),
        count:z.number().int().min(1).max(200).optional().describe('返回的搜索结果数量，默认10条')
       });
       this.tool = tool(//? 可选参数
        async ({query,count}: {query:string;count?:number}) => {
            const apiKey = this.configService.get<string>('BOCHA_API_KEY');//范型约定
            if(!apiKey){
                return `Bocha Web Search 的 API Key未配置`;
            }
            const url = 'https://api.bochaai.com/v1/web-search';
            const body = {
                query,
                //不限制时间
                freshness:true,
                count:count ?? 10,//默认10条
                summary:true,//返回摘要信息
            };
            const response = await fetch(url,{
                method:'POST',
                headers:{
                    'Authorization':`Bearer ${apiKey}`,//令牌
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(body),
            });
            if(!response.ok){
                const errorText = await response.text();
                return `搜索API请求失败，状态码：${response.status}，错误信息：${errorText}`;
            }

            let json:any;
            try {
                json = await response.json();
            }catch (e) {
                return `搜索API响应解析失败：${(e as Error).message}`;
            }
            try {
                    if (json.code !== 200 || !json.data) {
                      return `搜索 API 请求失败，原因是: ${json.msg ?? '未知错误'}`;
                    }
          
                    const webpages = json.data.webPages?.value ?? [];
                    if (!webpages.length) {
                      return '未找到相关结果。';
                    }
          
                    const formatted = webpages
                      .map(
                        (page: any, idx: number) =>
                          `引用: ${idx + 1}
                            标题: ${page.name}
                            URL: ${page.url}
                            摘要: ${page.summary}
                            网站名称: ${page.siteName}
                            网站图标: ${page.siteIcon}
                            发布时间: ${page.dateLastCrawled}`,
                      )
                      .join('\n\n');
          
                    return formatted;
                  } catch (e) {
                    return `搜索 API 请求失败，原因是：搜索结果解析失败 ${(e as Error).message}`;
                  }
            
        },
        {
            name:'web_search',
          description: `使用Bocha Web Search API 搜索互联网网页。 
                输入为搜索关键词（可选count 指定结果数量）,返回包含标题，
                URL, 摘要，网站名称，图标和时间等信息的结果列表`,
                schema: webSearchArgsSchema//保证数据的格式规范
        }
       )
    }
}