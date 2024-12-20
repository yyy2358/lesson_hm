let objectWithStringValue = {
    toString: function() {
        return 'hello';
    },
    valueOf: function() {
        return 1;
    }
}

// console.log(Number(objectWithStringValue))
console.log(String(objectWithStringValue))

let objectWithValueOf = {
    toString: function() {
        console.log('Calling toString')
        return this;
    },
    valueOf: function() {
        return 2;
    }
}

console.log(String(objectWithValueOf))//找toString方法 还会接着往下找
// try {
//     console.log(Number(objectWithValueOf))
// } catch (e) {
//     console.log('error')
// }
//转成Number先找valueOf方法  转成String先找toString方法

let objectWithoutPrimitive = {
    toString: function() {
        return this;
    },
    valueOf: function() {
        return this;
    }
}
try{
    console.log(String(objectWithoutPrimitive))
}catch(e){
    console.log('error')
}