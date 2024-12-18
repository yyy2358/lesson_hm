function generateRandomTime(){
    const date = new Date();//内置的date对象
    date.setHours(Math.floor(Math.random() * 24));//注意空格 可读性
    date.setMinutes(Math.floor(Math.random() * 60));
    date.setSeconds(Math.floor(Math.random() * 60));
    return date.toISOString();//返回ISO国际时区时间的描述字符串
}
console.log(generateRandomTime());