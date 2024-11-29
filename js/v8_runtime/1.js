//hoisting
console.log(a,func);
console.log(b);//词法环境中的变量/常量，在声明之前不可访问
//暂时性死区 TDZ
var a=1;
//变量环境
function func(){

}
let b=2;//词法环境 
b++;//词法环境里查找b
//var 函数 变量环境     let const