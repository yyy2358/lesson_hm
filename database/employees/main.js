//commonjs node 早期模块化方案
//js 早期没有 模块化方案
//函数  类（js没有），早期js业务简单 不需要模块化方案  页面交互等 
//幻灯片 js 就干这个事
//越来越复杂了， 文件分离，模块化方案需要
const sqlite3 = require('sqlite3');
//后端逻辑和数据库逻辑是分开的 
//db  数据库操作句柄  连接对象
//路径
//I/O操作
const db = new sqlite3.Database('./mydatabase.db',
    async(err) => {
    //err 表示是否出错， 容错是关键
    //node  js 快 ms级别
    //数据库 别的服务器/硬盘上  秒级别  这里为什么要用异步
    //await
    if (err) {
        console.log('数据库连接失败', err);
     return;
    }
    console.log('数据库连接成功');
    //风筝 数据库操作句柄
    await db.run
    `
    CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY,
        name TEXT   NOT NULL ,
        age INTEGER,
        department TEXT NOT NULL,
        salary INTEGER NOT NULL
    )
    `
    //索引、主键：primaryKey 
    //database peompt 不用写sql也能和数据库交流
    })