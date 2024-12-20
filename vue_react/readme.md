- 余说react 学习路径
- react 基础语法 过一遍 （b站|文档
- hooks 相关
- 全家桶 （react-router-dom|redux|react-redux|antd）
- 状态管理
- 源码 
- Antd ...
- ts

- AI Coding   AI编辑器
   - Vue + React 一起搞
   - 自然语义编程
     tailwindcss  语义
     antd 组件

   - 给AI一张设计稿 -> 生成组件

- http(CDN 更快) 引入 前端组件库
  - vue
    Vue对象

- 挂载点
   将前端工作交给vue/react处理，在html里只需要一个**挂载点** #root

   挂载Vue App 应用实例
- vue 哲学  让我们focus业务的现代前端框架
  - html界面上升到应用的复杂，现在前端复杂
  - web应用是数据驱动界面
  - vue 事件机制 方便 @click="increment"     
  - 响应式编程
     - ref(0) 包装简单数据类型成为响应式对象
     - .value = "" 修改value 值改变的同时，界面热更新
     - 规避DOM 编程  
     - 不再为API 编程 而focus 业务开发


- App 和传统编程的区别   和以前的say  bye     convers
  - createApp 创建Vue App
  - #root 结合
  - #root 里面就是Vue 的世界了
   {{Count}}
   {{}} vue 的数据占位符
     可以改变的
     不需要document.querySelector("")
     {{data}}
     setup(){
   
    }
    {{}}先占个位置，等下再去输出