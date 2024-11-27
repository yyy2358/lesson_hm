function foo() {
    var a = 1;
    let b = 2;
    {
      let b = 3;
      var c = 4;//c 提升到当前执行上下文的变量环境中
      let d = 5;
      console.log(a);//1
      console.log(b)  //3
    }
    {
        let b = 5;
    }
    console.log(b)//2
    console.log(c)//4,var 不支持块级作用域
    console.log(d)//d is not defined，块级作用域已经销毁了，查找不到
  }

foo()