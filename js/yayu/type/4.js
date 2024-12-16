//基本数据类型间的显示类型转化换之Number
//Number 
console.log(Number())
//NaN undefined 数值上下文中没有转成一个特定数字的含义
console.log(Number(undefined))
//0
console.log(Number(null))
console.log(Number(false))
console.log(Number(true))
console.log(Number("123"))
console.log(Number("-123"))
//16进制
console.log(Number("0x11"))
console.log(Number(""),Number(" "))
console.log(Number("100a"))