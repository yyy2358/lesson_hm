import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config()

const client = new OpenAI({
  // node 里的进程对象
  apiKey: process.env.OPENAI_API_KEY,
  baseURL:process.env.OPENAI_BASE_URL
})
// es6 默认参数值
// 通用的LLM 聊天完成接口函数， 复用
const getCompletion =  async (prompt, model="gpt-3.5-turbo") => {
  // 用户提的问题
  const messages = [{
    role: 'user',
    content: prompt
  }];
  // AIGC chat 接口
  const response = await client.chat.completions.create({
    model: model,
    messages: messages,
    // LLM 生成内容的随机性
    temperature: 0.1
  }) 
  return response.choices[0].message.content
}

const main = async () => {
    const user_messages = [
        "La performance du système est plus lente que d'habitude.",  //系统的性能比平时慢         
        "Mi monitor tiene píxeles que no se iluminan.",              //我的显示器有些像素点不亮。
        "Il mio mouse non funziona",                                // 我的鼠标坏了
        "Mój klawisz Ctrl jest zepsuty",                            // 我的Ctrl键坏了
        "我的屏幕在闪烁"                    
      ]
      //for of es6 的遍历
      //计数循环 有什么好的地方？
  for(let issue of user_messages){
    //简洁， 代码可读性的提升  
    console.log(issue);
    const prompt =`
    Tell me what language this is:"${issue}"
    `
    const countryLanguage = await getCompletion(prompt)
    //console.log(response);
    const resultPrompt = `
    帮我翻译以下的文字到中文，"${issue}"
    `
    const result = await getCompletion(resultPrompt)
    console.log(`${countryLanguage}, 翻译结果是: ${result}`)
  }
//   console.log(issue); for循环 块级作用域 声明完之后会销毁，所以在外面打印不了，没有独立的执行上下文
//但会有块级执行栈

}

main()
