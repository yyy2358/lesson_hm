# Milvus 向量数据库

- Agentic AI
    更智能的AI 
    AI Agent 产品一般都会使用Milvus

要做线上项目 有好多知识 都要做向量化 所以要用向量数据库      手写cursor

- 传统关系型数据库
    Mysql/PSQL   CRUD  已经被AI替代
    主打精准条件查询
    存二维表结构化数据，业务事务为主

- 向量数据库 Milvus 开源
    Milvus负责的增删改查是语义库的东西   专门做语义检索的向量数据库 主打语义、相似度、模糊匹配、智能搜索
    存向量 + 结构化字段
- 共性
    都有前端
        传统适合 文章列表页、详情页等
        Milvus chatbot、搜索页面
    后端
        传统 CRUD
        Milvus embedding 嵌入      由openai提供
        新增
        检索retrieve
        修改
        删除

