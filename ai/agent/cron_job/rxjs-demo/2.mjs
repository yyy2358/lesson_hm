import {
    from,map
} from 'rxjs';

from ([1,2,3,4,5])//把数组变成数据流，挨个发出
    .pipe(map(v => v * 2))//加工数据  套一个加工管道
    .subscribe(v => console.log(v))//接收加工完的数据，打印出来