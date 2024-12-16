var obj = {
    name: "Cherry",
    func1: function() {
      console.log(this.name)
    },
    func2: function() {
      setTimeout(function() {
        this.func1()
      }.call(this) ,5000)//apply，，call立即执行了func1，没有返回值，bind返回了一个函数，先指定了this，然后再执行
    }//.bind(obj), 5000
  }
  obj.func2()