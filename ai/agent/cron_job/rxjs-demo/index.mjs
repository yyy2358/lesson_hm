//观察者模式是经典的 设计模式
import {
    Observable
} from 'rxjs';
//创建了一个Observable对象  可以用来发布数据
//参数是一个回调函数 ， 每次有新的异步事件到达都会执行这个函数
//subscriber 观察者对象
const stream = new Observable((subscriber) => {
    //next 发送数据
    //complete 完成数据流
    subscriber.next('hello')
    subscriber.next('world')//拿到了异步给出来的对象
    subscriber.complete()
    
})
//订阅数据流
stream.subscribe((value) => {
    //观察者函数
    console.log(value);
})