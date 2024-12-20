
function typeOf(obj){
    //typeOf 除了null之外的基本数据类型
    //function 可以之外都是 object
    // let res = Object.prototype.toString.call(obj).split(' ')[1]//.slice(0,-1).toLowerCase();
    // res = res.substring(0,res.length-1).toLowerCase();
    //不包含]
    // return res;
    return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase();
}
// mdn文档 js官方
//[Object Array] 第八个字符到倒数第二个字符
console.log(typeOf([1]))