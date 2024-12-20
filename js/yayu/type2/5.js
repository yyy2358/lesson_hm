//Object => Primitive
let specialObj = {
    valueOf: function() {
        console.log('Calling valueOf')
        return 123;//拦截，把对象转成基本数据类型
    },
    toString: function() {
        console.log('Calling toString')
        return '456';
    }
}
// console.log(specialObj + 1);//对象上都会有一个valueOf方法  
// console.log(Number())

let objectWihoutPrimitiveValueOf = {
    valueOf: function() {
        console.log('Calling valueOf')
        return this;
    },
    toString: function() {
        console.log('Calling toString')
        return '789';
    }
}
//toPrimitive
console.log(Number(objectWihoutPrimitiveValueOf))  //先走valueOf 还没拿到想要的值还是对象 所以要再走toString

let problemObj = {
    valueOf: function() {
        console.log('Calling valueOf')
        return this;
    },
    toString: function() {
        console.log('Calling toString')
        return this;
    }
}
try{
console.log(Number(problemObj))
}catch(e){
    console.log('error')
}