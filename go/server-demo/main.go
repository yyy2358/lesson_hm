package main

import (
	"fmt"
	"net/http"
) //http的请求模块 内置

// 请求响应的简单协议
func handler(w http.ResponseWriter, r *http.Request) { //w把内容发给浏览器 / 请求方
	//将输出写入网络或文件输出流
	fmt.Fprintf(w, "hello world")
}

//指针指向请求对象 拿到请求头请求体
//http后面的是类型

func main() {
	http.HandleFunc("/", handler) //处理路由
	http.ListenAndServe(":8080", nil)
	// 监听本机 8080 端口，启动 Web 服务
	// 第二个参数 nil 代表使用默认路由分发器
	// 该方法会阻塞运行，持续接收客户端请求，程序不会主动退出
}
