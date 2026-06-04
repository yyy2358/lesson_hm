go/rust
ingo ai框架  可以做外包   可以把老的python项目翻译成go
mvc的概念 restful 的概念
# GO
当下最主流的后端语言   
在完成js任务的同时 还能够去学其他东西  可以用go做个agent
leader喜欢学了go的js前端
虚拟数字人结合react nestjs go语言一起打造

## firsst go
- func 声明函数
- package 声明模块  模块化构成程序
- import "fmt" 引入内置模块

## 变量的声明
    var

    Go 支持在函数内部定义函数，也就是匿名函数 / 闭包

## 协程  go语言最核心的概念
    进程 分配资源的最小单位
    线程 执行的最小单位
    协程 goroutine 高并发 同时做多件事情的能力
    用户态下程序自主调度

轻量级线程：goroutine 是由 Go 运行时管理的用户态线程，创建和切换开销极小（约 2KB 栈空间），可轻松启动数万甚至百万级并发任务。
M:N 调度模型：Go 的调度器将多个 goroutine 多路复用到少量操作系统线程（M:N 模型），避免了传统线程上下文切换的高昂成本。
自动调度：当 goroutine 遇到 I/O 阻塞（如网络请求、文件读写）时，运行时会自动将其挂起，并调度其他就绪的 goroutine 继续执行，实现非阻塞并发。
通道（channel）通信：goroutine 之间通过 channel 进行安全通信和同步，避免了传统锁机制的复杂性和竞态条件，符合“不要通过共享内存来通信，而应通过通信来共享内存”的设计哲学。

    厨师 一次只做一道菜 肉菜需要炖20分钟，
    不用等，多照看几道菜，切土豆丝....
    协程并发

## Web Server

### Gin 框架
相当于node的Express开发框架

- Gin 是一个基于Go语言的高性能、轻量级HTTP Web框架，以极快的路由速度和简洁易用的API
设计闻名，非常适合构建高并发的RESTFUL 服务

使用第三方库要初始化
go mod init gin-demo
初始化一个名为gin-demo的Go模块 创建go.mod文件 管理项目依赖，让项目脱离GOPATH独立运行
go run main.go

Docker