# def声明函数的语法关键字  : 封装一个函数

def Merge(dict1, dict2):
  # 使用 ** 操作符将字典 dict1 和 dict2 合并成一个新的字典
  # **是用于解包字典的操作符，用于将字典中的键值对展开为独立的参数，解构运算符
  res = {**dict1, **dict2}

  return res
# js 对象字面量 python 字典 key:value 键值对
dict1 = {"name": "过大侠", "age": 20}
dict2 = {"name": "小龙女", "city": "地下城"}
dict3 = Merge(dict1, dict2)
print(dict3)