import { client } from './app.service.mjs';

// 不用字符匹配， keyword 专成向量表达 数学
// cosine 1 相同  越小 0 不同  -1 相反
// completions.create() AIGC 生成
// completions.chat.creater() 聊天生成
// embeddings.create() 向量生成  [ 0.23, ......  ] 维度
// 文本嵌入 embedding
const response = await client.embeddings.create({
  // embedding 专有model 
  model: 'text-embedding-ada-002',
  input: '你好',
});

console.log(response.data[0].embedding, response.data[0].embedding.length,"/////");