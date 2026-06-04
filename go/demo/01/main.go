// 声明模块
package main

import "fmt" //格式化输出   内置模块fmt

func add(a int, b int) int {
	return a + b
}

//func 函数
func main() {
	fmt.Println("Hello Go")
	//变量声明 必须要使用  不用var 直接声明也可以   通过赋值推导数据类型
	// var name string = "花花"
	//GO 是强类型语言 var显示声明类型
	//:= 声明时已被推断为整形  后续不能再改变类型
	age := 18
	//age =19
	// age = "22"
	if age >= 18 {
		fmt.Println("adult")
	}
	//循环只有for 没有while
	for i := 0; i < 10; i++ {
		fmt.Println(i)
	}
	//长度为3 int类型整数
	//go里面数组用的不多    缺点 要提前申请空间 固定长度 内存有开销
	arr := [3]int{1, 2, 3}
	//用切片 动态数组  不指定大小
	slice := []int{1, 2, 3}
	slice = append(slice, 4)
	//json object
	//HashMAP 键值对 key是个字符串 值是整数
	m := map[string]int{"a": 1, "b": 2}
	fmt.Println(m["a"])
	//GO 里面没有class
	//结构体
	type User struct {
		Name string
		Age  int
	}

	u := User{Name: "Andrew", Age: 18}
	fmt.Println(arr, slice, u)

	//并发
}

//指针
func updateAge(age *int) {
	*age = 20
}
