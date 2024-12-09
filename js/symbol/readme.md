# Symbol 
用来添加新的属性
- 唯一值
  - 用Symbol函数来声明
  - 给一个label（可选）
  - 返回值唯一值
  - 常用于对象字面量 不会，不需要当心 会被覆盖
    key 的用法 这也是Symbol 需要的原因
    大厂大型项目，对象复杂，难维护，多人协作             看到公司的代码天都塌了  

    - Object.keys() 对象的键名数组，但是不包括  Symbol 类型的键名
    - Object.values() 对象的键值数组，但是不包括  Symbol 类型的键值
    - Object.entries() 对象的键值对数组，但是不包括  Symbol 类型的键值对    因为 Symbol 类型的键是唯一的，并且它们不是对象的普通属性，而是对象的元属性。
    静态
    Object 是所有对象字面量的基类，它的静态方法都可以用于对象字面量。


- 可迭代对象（enumerable）
  - 可以使用for...of循环遍历的对象
  - 可以使用Symbol.iterator属性来指定遍历器函数
  - 遍历器函数返回一个对象，该对象具有next方法
  - next方法返回一个对象，该对象具有value和done属性
  - value属性表示当前遍历到的值，done属性表示遍历是否结束

  Object.getOwnPropertyDescriptors(classMates) 对象上的属性描述符
    - 虽然 symbols emumberable 为true ，但仍然不可枚举
     因为symbols 独特设计，就是提供唯一值的（key，value），智只能通过getOwnPropertyDescriptors 来获取

- ownProperty?
  - 