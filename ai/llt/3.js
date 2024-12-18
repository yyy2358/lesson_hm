//生成一个18岁到55岁的随机年龄
function generateRandomAge(){
    return Math.floor(Math.random() * (55 - 18 + 1)) + 18;
}//+1是不包含55