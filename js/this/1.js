  "use strict";
  var x = 2;
  var obj = {
      x:1,
      //堆内存之中有自己的空间
      foo: function() {
        console.log(this)
        console.log(this.x)

      }
    }
  //函数体，（找到了函数的地址） 全局变量foo也拿到了堆内存之中的函数体function(){}
  var foo = obj.foo
  //相同点是：同一个函数在运行
  //区别：被谁调用，调用的位置不一样
  //调用时候？调用方式不一样
  //作为对象的方法被调用

  var obj2 = {
    x:5,
    foo: foo
  }
  obj2.foo();//5
  obj.foo()//1
  //作为普通函数被调用
  foo();//被window调用
  //2 没有必要this，所以undefined
  //this指向运行时候的执行上下文