// 强类型可以杜绝90%的错误
function addTs(a: number, b: number):number {
  return a + b;
}

const result2 = addTs(10, 5);
// console.log(result2);
const result3 = addTs(10, "5");