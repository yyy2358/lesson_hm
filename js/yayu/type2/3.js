console.log(Object.prototype.toString.call({a: 1}))
console.log(Object.prototype.toString.call([1,2]))
console.log(String({ a: 1 }))//toString()方法
console.log(String([1,2]),'[1,2]')//数组本身的prototype上就有toString方法  Array.prototype.toString
console.log(({a: 1}).toString())

console.log((function(){var a = 1;}).toString())
console.log(String(new Date(2024,12,18)))

console.log(JSON.stringify({a: 1}))

console.log([1,2].toString())