//头文件(模块)引入写在头部，不会重复
import dotenv from 'dotenv';
import OpenAI from 'openai';

//.env 本项目 环境变量配置文件
dotenv.config();
//全面es6
//全局环境对象
const {
OPENAI_API_KEY,
OPENAI_BASE_URL,
} = process.env//进程是分配资源的最小单位

//实例化openai对象
const client = new OpenAI({
  apiKey: OPENAI_API_KEY,
  baseURL: OPENAI_BASE_URL,
});

//完成一个接口函数的封装 get_completion
//async 异步函数 是es7 
// await 关键字来等待这个异步函数返回结果
/**
 * 获取 OpenAI 模型的完成内容
 * @param {string} prompt - 用户的输入提示
 * @param {string} model - 要使用的 OpenAI 模型，默认为 'gpt-3.5-turbo'
 * @returns {Promise<string>} - 完成内容的 Promise
 */
const get_completion = async (prompt, model = 'gpt-3.5-turbo') => {
  // 创建一个包含用户输入的消息对象
  const messages = [
    { role: 'user', content: prompt }
  ];

  // 使用 OpenAI API 获取完成内容
  const response = await client.chat.completions.create({
    model: model,
    messages: messages,
    temperature: 0, // 模型输出的温度系数，控制输出的随机程度
  });

  // 返回完成内容
  return response.choices[0].message.content;
};


const main =async () =>{
    // nlp 情感分析
//   const sentiment = "negative"//消极
//   const review = `
//   因此，他们仍然以 70-10 左右的价格在季节性销售，价格也比之前的 29 美元低。
//   所以它看起来还不错，但如果你看看底座，刀片锁定到位的部分看起来不如几年前的版本那么好，但我打算非常温柔地使用它（例如，我先在搅拌机中粉碎非常硬的物品，如豆子、冰、米饭等。然后在搅拌机中将它们粉碎成我想要的份量，然后切换到搅拌刀片以获得更细的面粉，并在制作冰沙时先使用十字切割刀片，然后如果我需要它们更细/更少的浆状，则使用平刀片）。制作冰沙的特别提示：将水果和蔬菜切碎并冷冻（如果使用菠菜，请稍微炖一下，然后冷冻直至可以使用；如果制作冰糕，请使用小型或中型食品加工机），这样就可以避免在制作冰沙时添加太多冰块。
//   大约一年后，电机发出奇怪的声音。
//   我打电话给客服，但保修期已过，所以我不得不再买一个。仅供参考：这类产品的整体质量已经下降，因此他们有点指望品牌认知度和消费者忠诚度来维持销售。大约两天后就收到了。
//   `
//   const prompt = 
//   `
//   你是一名客服AI助理，
//   你的任务是向尊贵的客户发送电子邮件回复，
//   给定以'''分隔的评论的客户发送电子邮件，
//   生成回复以感谢客户的评论。
//   如果情绪是正面或中性的，感谢他们的评论。
//   如果情绪是负面的，道歉并建议他们可以联系客服。
//   确保使用评论中的具体细节。
//   用简洁专业的语气写作。
//   在电子邮件中签名为"AI客服代理"
//   客户评论：'''${review}'''
//   评论情绪：${sentiment}
//   `
// //给他一个角色，明确他要完成的任务，细化任务，逐步理解他的需求
//   const response = await get_completion(prompt)
//   console.log(response);//模型原因没有使用评论中的细节
//  const lamp_review = `
//   需要一盏漂亮的灯放在我的卧室，这盏灯有额外的存储空间，而且价格也不太高。 
//   很快就收到了。我们灯的灯串在运输过程中断了，公司很乐意给我们寄来一根新的。
//   几天之内就到了。组装起来很容易。
//   我缺少一个零件，所以我联系了他们的支持人员，他们很快就给我找到了缺失的零件！ 
//   在我看来，Lumina 是一家关心客户和产品的好公司！！
//   `
  //吴恩达prompt系列 machine leaning 机器学习
  //nlp
//   const prompt =`
//   以下产品评论的情绪是什么，
//   以三个反引号分隔
//   确定以下评论作者表达的感情列表。
//   列表中最多包含5项。将你的答案格式化为以逗号分隔的单词列表。
//   评论内容'''${lamp_review}'''
//   `
// const prompt =`
//  以下评论作者是否在表达愤怒？
//  评论以三个反引号分隔。
//  请回答是或否。
//  评论内容'''${lamp_review}'''
//  `

// const prompt =`
//  从评论文本中识别以下项目：
//  - 评论着购买的物品
//  - 制造该商品的公司
 
//  评论以三个反引号分隔。
//  将你的回复格式化为JSON对象，其中"商品"和"品牌"作为键
//  如果信息不存在，请使用"未知"作为值。
//  让你的回复尽可能简短。

//  评论内容'''${lamp_review}'''
//  `

// const prompt = `
//   从评论文本中识别以下项目：
//   - 情绪（正面或负面）
//   - 评论者是否表达愤怒？（真或假）
//   - 评论者购买的商品
//   - 制造商品的公司

//   评论以三个反引号分隔。
//   将您的回复格式化为 JSON 对象，其中
//   “情绪”、“愤怒”、“商品”和“品牌”作为键。
//   如果信息不存在，请使用“未知”
//   作为值。
//   让您的回复尽可能简短。
//   将愤怒值格式化为布尔值。

//   评论文本: '''${lamp_review}'''
//   `
const lamp_review = `
"我最近在你们店购买了一款蓝色外套，但收到后真的很失望。
首先，物流配送时间比预计的长了很多，导致我在很急的情况下才收到。
其次，外套的质量不如我预期的好，虽然颜色和款式挺不错，但做工上有明显的瑕疵——袖口的缝线处居然有松动，摸上去质感也不如我之前在店里试穿的那件。
最让我不满的是客服的回应。当我联系你们客服说明情况时，得到的回复不仅没有给出有效的解决方案，反而显得有些冷漠，未能提供我所期望的帮助。
总体来说，这是一次非常不愉快的购物经历，觉得服务和质量都不值这个价格。
我很失望，不确定是否还会再购买。"
`
const prompt = `
任务：根据客户的评论，识别评论者的情绪（积极、消极或中性），并根据情绪做出相应的回答。正面评论要鼓励和感谢；负面评论要道歉、同理并提供解决方案；中性评论要感谢并鼓励提供反馈。

输入：'''${lamp_review}'''

输出：先进行情感分析（积极/消极/中性）

根据情绪类型，生成对应的回应：
1. **积极情绪**：生成感谢、鼓励并增强忠诚度的回复。
2. **消极情绪**：生成道歉、同理并提供解决方案的回应。
3. **中性情绪**：生成感谢并鼓励客户提供更多反馈的回应。`
  //这段prompt在做什么？描述清晰
  const response = await get_completion(prompt)
  console.log(response);
}
//facebook
 main()