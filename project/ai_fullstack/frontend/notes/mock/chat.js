// 流式输出本质是边算（llm token 生成）边给， 而不是等全部结果生成再一次性返回。
// AI场景中， 模型生成文本是逐个token 产生的（模型每次基于已生成的token序列，
// 通过自回归方式预测下一个最可能的方式预测下一个最可能的token）
// streaming: true
// http chunked 数据块来传， res.end()不用这个
// res.write(chunk) 
// res.end text/plain; 
// SSE text/event-stream   模式去发送tokens 
import { config } from 'dotenv';
config();

export default [
  {
    url: '/api/ai/chat',
    method: 'post',
    // rawResponse 用于自定义原始 HTTP 响应（如流式输出），
    // 而 response 通常指封装后的结构化响应。
    rawResponse: async (req, res) => {
      // node 原生的去拿到请求体
      // chunk 数据块（buffer）
      // tcp/ip 可靠的传输协议
      // 按顺序组装， 失败重传  html 
      // on  data 
      let body = '';
      // chunk 二进制流 buffer 
      // 字符串
      req.on('data', (chunk) => { body += chunk })
      req.on('end', async () => {
        // 都到位了 
        // console.log(body);
        try {
          const { messages } = JSON.parse(body);
          // console.log(messages);
          res.setHeader('Content-Type', 'text/plain;charset=utf-8');
          // 响应头先告诉浏览器 流式， 数据会分块传输
          res.setHeader('Transfer-Encoding', 'chunked');
          // vercel ai sdk 特制头
          res.setHeader('x-vercel-ai-data-stream', 'v1');
          console.log(process.env.VITE_DEEPSEEK_API_KEY, "///////")
          const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.VITE_DEEPSEEK_API_KEY}`
            },
            body:JSON.stringify({
              model: 'deepseek-chat',
              messages: messages,
              stream: true // 流式输出
            })
          })
          if(!response.body) throw new Error("No response body");
          // SSE 二进制流 reader 对象 接跟管子一样
          // LLM 输出和解析之间连上一根管子
          // 用reader 对象不断读取llm 输出的token 流
          const reader = response.body.getReader();// token  
          // 用于将 ArrayBuffer 或 TypedArray（如 Uint8Array）解码为字符串，
          // Uint8Array 字节数据  解码为可读的 UTF-8 字符串 解码器
          const decoder = new TextDecoder();
          while(true) {
            // llm 的这一次的生成， 被读到了
            // 事件， 有新的token生成了 
            const { done, value } = await reader.read();
            console.log(done, value, '-----------');
            if (done) break;
            // 解析出 token => 字符串 LLM 内部 数学向量 
            const chunk = decoder.decode(value);
            // data:  前缀
            console.log(chunk, '/////'); // JSON 字符串 结构 choices[0].delta.content 内容
            // delta 增量， 又一次token 生成
            const lines = chunk.split('\n');// 拿到每一行有效数据
            for (let line of lines) { // 不需要用到下标 ，好理解，计数循环比较机械
              // startsWith es6 的语法 
              // es6 新api, 字符串开头是否包含指定的子字符串 更优雅，好读
              // data: [DONE]  结束信号
              if (line.startsWith('data: ') && line !== 'data: [DONE]') {
                try {
                  const data = JSON.parse(line.slice(6));
                  // ?. 代码的健壮性
                  const content = data.choices[0]?.delta?.content || '';
                  if (content) {
                    // 发送给前端  SSE 核心
                    // 向输出流不断的写入content, 
                    // ai-sdk 要求的格式
                    res.write(`0:${JSON.stringify(content)}\n`)
                  }
                } catch(err) {
                }
              }
            }
          }
          // 结束响应
          res.end();
        } catch(err) {

        }
      })
    }
  }
]