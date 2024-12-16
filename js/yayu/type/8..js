//map() 方法会将数组元素和其索引作为参数传递给回调函数
console.log([1,2,3].map(parseInt))
//parseInt(1,0)
//parseInt(2,1)
//parseInt(3,2)
//intem 整个数组
console.log([1,2,3].map((v,index,intem) =>{
    console.log(v,index,intem)
    return parseInt(v,index)
    }))//0 默认为10进制 