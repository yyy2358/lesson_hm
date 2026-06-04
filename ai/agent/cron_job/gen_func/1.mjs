//生成器函数 生成一个可以迭代的函数
function *fruitGenerator() {
    console.log('开始生产水果');
    yield 'apple';//暂停迭代
    console.log('生产了苹果，继续生产');
    yield 'orange';
    console.log('生产了橘子，生产结束');
    return '没有水果了'
}//手写async await

//生成器对象 迭代器
const fruitMachine = fruitGenerator();
console.log(fruitMachine.next());//开始迭代
console.log(fruitMachine.next());//继续迭代
console.log(fruitMachine.next());//继续迭代     
//迭代之后是有返回结果的 是一个对象  为false说明还要迭代 yield