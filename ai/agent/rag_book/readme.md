# RAG 电子书

- 一本电子书，如何做rag

也可以把各家的面试题 所有的面经 喂给大模型 做一个ai招聘助手 GitHub上面有
腾讯小龙虾  对uml面向对象的了解    
ai全栈开发工程师 大模型应用开发工程师  阿里跟字节 百度     react源码
AI学习项目集    再创建一个新仓库放这些东西进去  要会用git啊 也不要一股脑放进去 要学会分段上传
solo出来的是MVP（最小可行产品）：核心功能完整、能上线验证市场的最简版  要商业化的还要很多细节
拍照记单词
龙虾的创业 虚拟员工 

- RAG 的流程
1.知识库
2.@langchain/community
    需要来自社区的各种loader 来加载文档
3.Splitter
4.Document
    pageContent
    meta: 放元数据 比如标题、章节、页码等
5.Embedding Model  计算下向量就可以 更便宜一点
6.Milvus 

## 开发流程
- ensureBookCollection
    - 判断集合是否存在 hasCollection
    - 没有则 创建集合 createCollection
       有着丰富的 schema
    - 创建索引 createIndex
    - 加载集合 

  
    
## MVP
- Vibe Coding 
    - 做到了代码平权
    - idear想法  可以是设计师等
    Minimum Viable   最小可行性产品
    借助cursor/ code  等编程Agent 开发出MVP
    产品原型是产品经理设计出来的原型稿
    对mvp二次开发
- 正式的商业级别开发
    需要prompt 的细节 Claude code   ai全栈远程
    程序员 继续vibe coding 把功能细化 再测试验证 再修复审核 最后上线   
- 语义搜索和文本匹配
    - 文本匹配 低级搜索  like 模糊搜索 %段誉%
    - 语义搜索更强大  能够理解用户意图  提供更准确的结果      天龙八部agent

进行向量化 再根据client进行search