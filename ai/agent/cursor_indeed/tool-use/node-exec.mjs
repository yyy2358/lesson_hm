// exec执行命令的tool
import {
    spawn
    //node 内置模块
    //高级  新建一个子进程 (进程是分配资源的最小单位 , 线程是执行的最小单位)(如cpu计算资源 ,内存操作使用资源)
    //主进程 node  node-exec.mjs
    //执行 npm i    npm run dev  npm init vite  执行命令
    //cmd 命令 本身就是进程  不能阻塞主进程
    //node 可以是多线程的架构   js是单线程
    //所以拆分成 父进程mini-cursor 启动 子进程
}   from 'node:child_process';
//bash 命令
const command = 'ls -la';
//新建一个子进程  执行命令行任务   
//扩展运算符  
const [cmd, ...args] = command.split(' ');
const cwd = process.cwd();
console.log(`当前工作目录：${cwd}`)
//并发
const child = spawn(cmd, args, {
    cwd,//用父进程的命令行运行
    stdio: 'inherit',//继承父进程的输入输出流 stdin stdout
    shell: true
    //shell脚本 执行命令
})//描述对象

//监听事件处理
let errorMsg = '';
//进程间的通信？ 基于事件
child.on('error', (error) => {
    errorMsg = error.message;
});
//子进程执行完成  关闭 内存回收
child.on('close', (code) => {
    if (code === 0) {
        //成功退出
        console.log('命令执行成功，子进程退出')
        process.exit(0);
    } else {
       if (errorMsg){
        console.error(`错误, ${errorMsg}`);
       }
       process.exit(code || 1);
    }
})