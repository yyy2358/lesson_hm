- 余说react 学习路径
- react 基础语法 过一遍 （b站|文档
- hooks 相关 重点学习
- 全家桶 （react-router-dom|redux|react-redux|antd）
- 状态管理
- react源码 
- Antd ...ui组件库
- ts

- AI Coding   AI编辑器
   - Vue + React 一起搞
   - 自然语义编程
     tailwindcss  语义 结合cursor
     antd 组件

   - 给AI一张设计稿 -> 生成组件

- http(CDN 更快) 引入 前端组件库
  - vue
    Vue对象

- 挂载点
   将前端工作交给vue/react处理，在html里只需要一个**挂载点** #root

   挂载Vue App 应用实例
- vue 哲学  让我们focus业务的现代前端框架
  - html界面上升到应用的复杂，现在前端复杂  不然jquery+原生js就行
  - web应用是数据驱动界面
  - vue 事件机制 方便   @click="increment"        @加事件名 
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
   {{}} vue 的数据占位符  html不能解析
     可以改变的  动态数据 {{}}中的
     不需要document.querySelector("")
     {{data}}
     setup(){
   
    }
    {{}}先占个位置，等下再去输出

    请创建一个vue 应用实例，挂载到#root 上 用cdn方式引入vue.js



- DOM编程是指使用JavaScript直接操作文档对象模型（Document Object Model）来动态修改网页内容、结构和样式的方式。在传统的前端开发中，开发者需要通过DOM API来获取元素、修改属性、添加事件监听器等。

从你的代码中可以看到一些DOM编程的替代方式：

在Vue中，不再需要直接使用document.querySelector()来获取元素，而是通过{{}}模板语法来绑定数据

事件处理也不再需要addEventListener()，而是使用@click这样的指令

数据更新时，Vue会自动更新DOM，而不需要手动操作DOM元素

prompt编程  未来方向
ai 找cdn