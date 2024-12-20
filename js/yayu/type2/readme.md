# 显示类型转换和隐式转换
- String Number Boolean 函数运行 强制类型转换
- 构造函数 new 
- Primitive 怎么转对象

- 包装类
  "abc".length
  "1.23".toFixed(1)
  new String("abc")   new Number(1.23)  不是实例化的，也能调用类上的方法
  因为js一切面向对象 自动帮我们包装一下简单数据类型
  叫做包装类

- 对象转Primitive   Object => primitive
  - Boolean
  - Number
    
  - String
    toString()
    - Object.prototype.toString.call({a:1})借给某个对象用，会返回确切类型 "[object Object]"
    - 数组，调用原型（自身）上的toString方法
    - 函数 返回源代码 
    - 日期


- Object => Primitive  情理之中
  - String
  - 先去调用valueOf方法，如果是原始值，返回。
  - 否则，调用toString方法，返回一个原始值，返回
  - 如果toString 返回的还是复杂数据类型/对象 抛出异常

- Object => String|Number
  - toPrimitive 是使命 
  - toString
  - valueOf
  - Number 先valueOf 再toString
  - String 先toString 再valueOf
    也在情理之中
  - 报错 TypeError: Cannot convert object to primitive value 