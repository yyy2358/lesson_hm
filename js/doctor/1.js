//  编写一个函数， [1，2，3，4，5，6，7，8，9，0]
//return "(123) 456-7890"电话号码
function gtePhoneNumber(arr) {
//for (let i = 0; i < arr.length; i++) {
  //console.log(arr[1]);
//}
//return "("+arr[0]+arr[1]+arr[2]+") "
  //+arr[3]+arr[4]+arr[5]+"-"+arr[6]+arr[7]+arr[8]+arr[9];
 // es6 模板字符串 提升代码的可读性
  return `（${arr[0]}${arr[1]}${arr[2]} ${arr[3]}${arr[4]}${arr[5]}-${arr[6]}${arr[7]}${arr[8]}${arr[9]}`
}
gtePhoneNumber([1,2,3,4,5,6,7,8,9,0]);
console.log(gtePhoneNumber([1,2,3,4,5,6,7,8,9,0]));