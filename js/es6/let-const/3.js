const fjxObj = {
  name: "张三",
   hobbies: ["吃饭", "睡觉", "打豆豆"],
  age: 18,
  sex: "男",
};
//Assignment to constant variable.
fjxObj.hobbies.push("打游戏");
console.log(fjxObj);
//const 关键字用于声明常量，
// 它保证变量的值不能被更改，但它不限制对常量对象的属性进行修改。
// 这就是为什么 "打游戏" 可以被添加到 PERSON.hobbies 数组中的原因。S