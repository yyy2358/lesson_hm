const wes = Symbol('Wes');
//同学  对象字面量
let name = "张三"
const classMates = {
    //字符串  覆盖
    "cy":1,
    "cy":2,
    [name]:"猛男",
    // Symbol 可以代替字符串作为key
    [Symbol('Mark')]:{grade:50,gender:'male'},//属性，字面量
    [Symbol('olivia')]:{grade:80,gender:'female'},
    [Symbol('Mark')]:{grade:50,gender:'male'},//把[]里的值再运行一下，symbol本身不是字符串，所以不会重复
}
console.log(classMates[name],classMates.cy,classMates);
// 二维的
for (let [key,val] of Object.entries(classMates)) {
    console.log(key,val);
}
for(const person in classMates){
    console.log(person,classMates[person]);
}

const syms = Object.getOwnPropertySymbols(classMates);
console.log(syms);

const data = syms.map(sym => classMates[sym]);
console.log(data);
//属性描述符，除了value，还有其他的
console.log(Object.getOwnPropertyDescriptors(classMates));