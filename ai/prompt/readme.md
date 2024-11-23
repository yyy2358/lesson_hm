## Prompt 设计模式

  - 写程序组织起来,用大模型写程序

- 吴恩达 Prompt Engineering 

- LLM 开发的模板
 - 代码工程
  1. npm init -y
  2. 将dependencies：{} 部分拷贝过去
   npm i    
   node 后端项目的依赖

- dotenv 的理解
   - process.env 对象
   - key 不能在代码中已明文出现
   - 项目的根目录下添加 .env 文件, 包含key等信息
   - 不能提交到github  .gitignore 添加这类文件的申明
   - dotenv.config() 将.env 读入到 process.env 对象中

- 了解prompt 设计模式,开发功能需求prompt 模板  (前端后端的事交给大模型就行了)
AI 应用
  - 总结模板