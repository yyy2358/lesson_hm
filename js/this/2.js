var name="刀郎"
var a= {
    name:"薛之谦",
    func1:function(){
        console.log(this.name)
    },
    fun2:function(){
      setTimeout(()=>{
        //this被指定了
       this.func1();//指向全局，但是全局没有定义func，严格模式下是undefined
      },1000)
    }
}

a.fun2();