function bar(){
  console.log(myname);
}

function foo(){
    var myname = '肖总'
    bar()
    console.log(myname);
}
 var myname = 'lisi'
foo();
//outer是指向词法环境的指针，指向的是全局环境，所以打印的是全局环境中的myname，而不是foo函数中的myname。