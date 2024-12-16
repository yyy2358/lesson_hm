//false | true
//所有的Primitive 类型 -> Boolean  
//构造函数 来用
console.log(Boolean())//默认值是false
console.log(Boolean(false))
console.log(Boolean(true))
console.log(Boolean(undefined))//false 
console.log(Boolean(null))//false   
console.log(Boolean(+0),'+0')//false
console.log(Boolean(-0),'-0')//false
console.log(Boolean(NaN),'NaN')//false
console.log(Boolean(""))//false