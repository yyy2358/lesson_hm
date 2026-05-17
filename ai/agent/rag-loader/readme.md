# Rag loader 从各种来源加载文档    (检索增强生成加载器)
是 RAG 系统里的数据入口 / 文档加载组件，负责把各种异构来源（PDF、Word、网页、数据库等）的原始数据，解析、清洗并统一转换成系统可处理的标准文档对象（如 LangChain 的 Document），供后续分块、向量化、入库与检索使用

RAG 系统里负责读取各类文档、转为标准文本数据的加载工具。

- loader
    - 载入任何类型文件
- text splitter
    - rawDocument Document(pageContent chunks)

TextSplitter：RAG 里用来切割长文本、生成 Chunk 的文本分割工具。
Chunk：把长文本切分成小块文本片段，方便向量化检索。

## loader

构建虚拟人，langchain有读取网页工具 然后再做rag
- @langchain/community 文件类型很多 社区模块
- 网页loader

LangChain Community：存放社区贡献的第三方集成、工具、Loader、向量库等非官方核心的扩展包。

- cheerio Node.js 版轻量 jQuery，爬网页、提取网页正文专用库。
    - 用选择器精准抓文字、标签内容
    - 只解析静态 HTML，不执行 JS
    - 只解析静态 HTML，不执行 JS
    - 搭配 LangChain：CheerioWebBaseLoader

## splitter
- 。，？ 天然的语义分割器
- chunkSize 大小    可以把几个段落合并成一个chunk 也可以把一个段落切分成多个chunk

- RecursiveCharacterTextSplitter  LangChain 最智能、最常用的文本分割器，按「语义优先」把长文本切成合适的 Chunk，不强行拆句子
    - 递归地按字符分割，直到每个 chunk 都小于等于指定的大小

- similaritySearchWithScore 返回的 score是“距离”而不是“相似度”
- 相似度 = 1 - 距离

- 三个主要部分 （基于rag）
    - loader
    - text splitter 可以写文章对他的理解
    - vector store
    - 选择器cheerio

- 向量数据库 MVS


把之前那个项目加上mcp skills rag