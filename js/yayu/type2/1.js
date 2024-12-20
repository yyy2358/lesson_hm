var a = 1.234;
console.log(typeof a);//Number
var b = new Number(a);//Number对象
console.log(typeof b);//Object
console.log(b.toFixed(1))//"1.2"
//面向对象的极致风格  toFixed(a) 函数式
console.log(a.toFixed(1))//"1.2"包装类
// Number 把a包装成一个对象，然后调用对象的方法
// (new Number(a)).toFixed()
//依然还是 number 简单数据类型
