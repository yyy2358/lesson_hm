import { client } from './app.service.mjs';
// promisify fs 模块 thenable 
import fs from 'fs/promises';  // node 内置的文件模块  
// 读取文件内容
// const content = await fs.readFile('./data.txt', 'utf-8');
const inputFilePath = './data/posts.json'; // 读取文件
const outputFilePath = './data/posts-embedding.json'; // 写入文件，写入向量

const data = await fs.readFile(inputFilePath, 'utf-8');
const posts = JSON.parse(data);
// console.log(posts);

const postsWithEmbedding = [];

for (const { title, category } of posts) {
  const response = await client.embeddings.create({
    model: 'text-embedding-ada-002',
    input: `标题:${title} 分类:${category}`,
  });
  
  postsWithEmbedding.push({
    title,
    category,
    embedding: response.data[0].embedding,
  });
}

await fs.writeFile(outputFilePath, JSON.stringify(postsWithEmbedding, null, 2));

