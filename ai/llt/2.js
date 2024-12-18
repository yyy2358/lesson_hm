//代码可读性，函数命名自带解释
function generateRandomGender(){
      //return Math.random() > 0.5 ? 'male' : 'female';
      const genders = ['male','female'];
      return genders[Math.floor(Math.random()* genders.length)];
}//math.random()返回0-1之间的随机数，floor向下取整