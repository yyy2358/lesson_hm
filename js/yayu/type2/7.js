//只要不是数字，+ 作连接符
//二元运算符
console.log([]+[])
//一元运算符  隐式类型转换  先调用valueOf方法  数组返回它本身 所以不能转换为Primitive 再调用toString方法  返回字符串 正的字符串为nan
console.log(+ [1,2,3])
console.log([]==[])//只要对象指向的不是同一个地址 就返回false

let x= 42;
let y = {
    valueOf: function(){
        return 42;
    }
}

console.log(x==y)