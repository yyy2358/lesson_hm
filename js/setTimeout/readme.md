# 定时器

- js是单线程的，只有一个主线程
- setTimeout 是异步执行的计时器，会让同步代码先执行，会在主线程执行完后才执行（不一定准时）
callback 函数  放入event loop  ，时间（ms）
- 一定会在 指定时间后执行吗？
- 找回？
  执行的是回调函数
  - 返回值是定时器ID，用clearTimeout() 清除

  - 如何用 setTimeout 实现 setInterval？（常考题押题，大厂都是老题目只要刷的 足够多）
    - 场景编程题
    -  手写题 fn
     - customInterval 
     - callback，t参数
     - 可以用setTimeout 实现
     - 递归
     - 关闭？

- call
  函数对象上的方法，call是所有函数原型上的方法，在函数运行前就指定了，不会改变
  箭头函数，let _this = this,都是在编译阶段确定的