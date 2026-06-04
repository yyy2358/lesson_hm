import {
    from
} from 'rxjs';

const stream = from([1,2,3,4,5]);//from 可以把「普通数组 / Promise / 字符串」变成一个 Observable（可观察对象）
//它自动帮你循环数组，挨个 next 发出去！
stream.subscribe(v => console.log(v))//流式响应