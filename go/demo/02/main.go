package main

import (
	"fmt"
	"time"
)

func sayHello() {
	//耗时性的任务
	fmt.Println("hello")
}

func main() {
	// go 关键字 告诉go 运行时 ,在后台
	//开启一个新的轻量级的协程 来执行sayHello函数
	//是程序自主调度的一个机制 开销更小一点
	go sayHello()
	//主线程做主线程的 协程做协程的 要是主线程一下就做完了 协程就没得做
	fmt.Println("main")
	//主线程 main函数执行完之后 协程开辟要开销
	//阻塞主线程 协程就有机会  等待协程执行完成
	time.Sleep(time.Second)

}
