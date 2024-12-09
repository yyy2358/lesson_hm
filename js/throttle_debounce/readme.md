- 认识几个url
   url的设计模式 restful api
   网站是用来暴露资源的 如何将资源暴露出去 
  - http://localhost:3001/posts/ 列表页的链接
  - http://localhost:3001/posts/:id  id 查询参数 详情页的链接
  - http://localhost:3001/users/:id  用户主页链
- 数据的查询 Read
- 访问资源的方式
  - apiFox 是啥？ web 请求代理
    Get http://localhost:3001/posts/1 
    Patch http://localhost:3001/posts/1
  - 资源 db.json users posts
  - HTTP 协议
    - Method（动作 GET | PATCH 修改| POST 新增） + url （资源）=请求行
    - 请求头 Cookie Content-Type:text/json
    - 请求体 body （数据）
    - http 服务
    - db.json 数据资源向外提供访问 CRUD（增删改查）

- 会设计restful api 接口
  - 需求
    - 新增一篇文章
      （找一篇文章）http://localhost:3000/posts (指定method)POST
   （请求头）{
        。。。（请求体）

      }
  - 删除 文章2
  http://localhost:3000/posts/2 DELE

动态编程,debug，js七上八下
- json-server 是一个支持restful api 设计的数据服务器

- 全栈防抖
- 前后端分离  解耦
  - 前端 live-server 5500
    fetch url 
  - 后端 json-server 3001
    url 接口服务  restful 
  - API接口

web请求模拟器  可以模拟发送请求

- filter map 
    都是Arry.prototype 原型上的方法，所有的数组都有
    - filter 对数组进行过滤，回调函数中返回值是否为true 
    - map 对数组进行映射，回调函数中返回值为新的数组 原有数组不能满足需求  从一种数组 映射成另一种数组
    -forEach 迭代每一项 不需要返回 

- 防抖
  - 将要执行的函数交给一个debounce（）高阶函数去优化
  - 减少执行次数  只执行连续输入的最后一次
  - 定时器实现  本次关掉上一次的定时器