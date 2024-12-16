var a = {
    name: 'Cherry',
    fn: function(a, b) {
      console.log(this.name)
       return a + b;
    }
  }
  var b = a.fn;
  console.log(b.apply(a, [1, 2]))
  console.log(b.call(a, 1, 2))
  console.log(b.call(a, [1, 2]))
  console.log(b.bind(a, 1, 2)())