FIFO Queue

- typeof 
  变量存储的二进制 前三位 000 表示对象  010 表示函数 100 表示字符串 110 表示布尔值 1表示整数 0表示浮点数
  null 000 (历史遗留问题)  undefined 011

- Object.prototype.toString.call() 可以查看变量的确切类型

- substring slice 区别
  第二个参数 不一样
  slice 第二个参数endIndex ，不包括，支持负数，反向取更灵活
  substring 第二个参数length ，截取到length位置，不包括length位置，不支持负数，只能正向取

  slice更优
  substring 不支持负数  slice 支持负数 负数表示从后往前数
