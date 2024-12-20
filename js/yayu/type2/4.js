var arr = [1,2,3]
console.log(arr.valueOf());
var date = new Date(2024,12,18);
console.log(date.valueOf());




var num = new Number('123');
console.log(num.valueOf()); // 123
var str = new String('123abc');
console.log(str.valueOf()); // '123abc'
var bool = new Boolean('abc');
console.log(bool.valueOf()); // true

// 2. Date 类型返回一个内部表示：1970年1月1日以来的毫秒数

var date = new Date(2024,12,19);
console.log(date.valueOf())

//3.返回对象本身
var arr = [1,2,3]
console.log(arr.valueOf());