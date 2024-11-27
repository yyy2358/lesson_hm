//大厂语法基础题
//局部函数作用域
function sayHello() {
   //变量
    var name="金子涛";
   return "Hello "+name;
}
//es5 var 全局作用域（全局变量）
var age=10;
//代码块
//块级作用域（局部变量）只在块级里有用，var不受影响
if (age>5){
   //es6新增的 let变量声明 2015年
   var name="过帅";
   let dogYears=age*7;
   console.log("你今年"+dogYears+"岁")
   console.log(sayHello());
}
console.log(name,'name');
console.log(dogYears,'dogYears');//dogyears是使用let声明的块级作用域变量，外部无法访问


//console.log(sayHello()); 被放在 if 语句块内部是因为 sayHello 函数依赖于在 if 语句块内部声明的 name 变量。
//如果 sayHello 函数不依赖于任何在 if 语句块内部声明的变量，那么它可以被放在 if 语句块之外。
//打印“金子涛”是因为在sayhello函数内部声明的，并且这个name变量作用域仅限于sayhello函数内部，不受外部变量的影响