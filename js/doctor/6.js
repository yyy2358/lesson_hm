var a = 1;
var c=3;
function fn(a) {
  var a = 2;
  function a() {}
  var b  = a;
  console.log(a)
 console.log(c)
}
fn(3)
//fn在执行完后，再执行上下文 函数优先提升   调用栈
//var先创建一个执行上下文，变量提升，然后函数进栈，在创建一个执行上下文，内部函数定义也要重复，最后函数执行完出栈，输出2，3