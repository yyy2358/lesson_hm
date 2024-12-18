//es6 模块化 导包
//解构运算符
import {
    createCrawl,// 返回爬虫实例
    createCrawlOpenAI//openai 配置项
} from 'x-crawl';//这样写可读性更好

//实例化爬虫应用(要遵守网站的约定)
const crawlApp = createCrawl({
    maxRetry: 3,
    intervalTime:{max:1000,min:1000}//控制爬取的频率，1秒一次，不然容易踩缝纫机
})

const crawlOpenAIApp = createCrawlOpenAI({
    clientOptions:{
        apiKey:'sk-DQyFVvlYDkVEcwRy1uY6WOkEz0AUhGeQRdSQ0mXKA4JgCp8M',
        baseURL:'https://api.302.ai/v1/'
    },
    defaultModel: {
        model:'gpt-4-turbo-preview'
    }
})

crawlApp.crawlPage('https://movie.douban.com/chart')
   .then(async (res) => {//async 异步函数
    const {page,browser}= res.data;
    const targetSelector = '.indent';//选择器
    await page.waitForSelector(targetSelector);
    const highlyHTML = await page.$eval(
        targetSelector,
        (el) => el.innerHTML
    )
   // console.log(highlyHTML)
   const result = await crawlOpenAIApp.parseElements(
    highlyHTML,
    `
    获取图片链接、电影名称、评分、简介,输出格式为json数组,如：
    [{
        "src":"...",
        "title":"...",
        "score":"...",
        "desc":"..."
    }]
    `
   )
   browser.close();

   console.log(result)//prompt ai 爬虫

//    crawlApp.crawlFile({
//     targets:result.elements[0].image_link,
//     storeDirs:'./upload'
//    })
  })