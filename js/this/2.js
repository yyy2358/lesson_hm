var name="刀郎"
var a= {
    name:"薛之谦",
    func1:function(){
        console.log(this.name)
    },
    fun2:function(){
      setTimeout(function(){
          this.func1()
      },1000)
    }
}

a.fun2();