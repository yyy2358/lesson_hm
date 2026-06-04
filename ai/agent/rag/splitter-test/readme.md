# Splitter 理解

- loader 加载的大Document 来自 @langchain/community
    paf doc 不是一个类型 loader不一样
- RecursiveCharacterTextSplitter 递归字符文本分割器   (派生自TextSplitter这个基类)
    Text
- splitter 
    - character 按这个切  符合语义
    ["。","，","！","？"]
    优先级 。最优先
    后面的围绕 chunk_size的靠近  会递归的尝试，？！
    保持语义的连贯性
    当都符号都尝试完 chunksize还是大于或小于指定的字符数时
    切断  overlap 保证语义能够续上 牺牲一定的空间(chunk_size 10%) 重复

    先character 切 再 chunk Size 最后 Overlap(不一定必须重叠有刚好的情况)   组成document 

- 文本类大模型  多模态大模型     
- Token = 大模型专属字数计量单位

- TokenTextSplitter 令牌文本分割器

- RAG 问题   面试官会问的（要熬一个小时 尽可能详细就会要你 算法方面会给你放水 如果你的项目表达很好 技能强  agent打理的细节  面向对象有意识  再押题面试题）
    - 流程
    - loader   就安装一些包
    - Splitter 细节 三个参数
    - splitter 面向对象体系和关系    （uml）
        父类 TextSplitter 切割的是文本 ，MP3 mp4 不适合
        一系列的子类  CharacterTextSplitter
        TokenTextSplitter 按token数量切割
        RecursiveCharacterTextSplitter 语义的完整性特别好 递归的尝试不同的符号 保证语义的完整性第一位同时保证chunkSize 实在不行就overlap重叠一下
           MarkdownTextSplitter 为什么属于
           RecursiveTextSplitter 子类
           # ## ### 递归 Markdown有自带的格式符号  
           直接继承父类拿走整套拆分功能

- js-tiktoken 计算token数量  任何一个字符串都能算 统计耗费了多少token

- CharacterTextSplitter 字符文本分割器
    直接按Character separator 来切割
    缺点：语义完整性差
- RecursiveCharacterTextSplitter 递归字符文本分割器
    更人性化，更努力
    尝试其他符号时，语义就弱下来了，overlap 来弥补一下