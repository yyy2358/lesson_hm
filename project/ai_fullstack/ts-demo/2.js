// 强类型可以杜绝90%的错误
function addTs(a, b) {
    return a + b;
}
var result2 = addTs(10, 5);
// console.log(result2);
var result3 = addTs(10, "5");
