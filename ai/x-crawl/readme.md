- package.json
   项目描述文件，          入口文件是什么
   - dependencies  依赖部分？
   - devDependencies 开发期间依赖
   - scripts 脚本命令
     npm run dev (development)

     - 版本号 的意义
       - 1.0.0  正式版  商用  成熟（为用户负责）
       - 1.0.0  1主版本号 0次更新 0bug修复 
       - 2.0.0  重大更新  Vue2 Vue3
       - 2.2.0 添加了某项功能
       - 2.2.1 修复了某项bug
    
- es6
  - es6 模块化  import from  mjs 
  - 结构
    对象 、数组一次性结构 一批变量
  - 待解构的对象在右边
  - 解构出来的在左边
  - 对象 （key）、数组 （下标） 皆可解
  - ...rest 剩余运算符

文章 prompt 工程

- AI 爬虫的核心
   - 发送请求爬取HTML  完成了 输入 （html 字符串）
   - http 请求
   - 解析出来 indent

  - 交给大模型
  `
  ${indent_html}
    Get the image link
  `