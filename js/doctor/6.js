var a = 1;
var c = 3;
function fn(a) {
  var a = 2;
  function a() {}
  var b  = a;
  console.log(a)
  console.log(c)
}
fn(3)
//fn在执行完后，再执行上下文 函数优先提升   调用栈