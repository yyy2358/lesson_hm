console.log(1+'1');//只要有一个是字符串，会优先转字符串
console.log(+"1")//加法 调用了Number()方法
console.log(+[])//先走valueOf()方法  数组为空  再走toString()方法  空字符串  再调用Number()方法  0
console.log(+['1,2,3'])//NaN
console.log(+['1'])//1

console.log(+{})//先走valueOf()方法  {}对象  再走toString()方法 [object Object] 再调用Number()方法  NaN
console.log([]+{})//空+[object Object]
console.log({}+{})//双[object Object]

console.log(42 == ['42'])//true 一边为数字的话 会先调用valueOf()方法 会继续找下去 toString()

console.log(true == '2')//当一方出现布尔值使会优先对布尔值调用Number()方法  true->1

console.log(1 == '2')//false
console.log(null + 1)//1