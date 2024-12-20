//es6 class  几十年的面向对象设计模式
class MyQueue{
    constructor(){
        //后进后出
        this.stack1=[];
        //辅助先进先出
        this.stack2=[];
    }
    
    push(x){
        this.stack1.push(x);
    }

    pop(){
        //只要不为空，stack2的 顶部就是队列
      if(this.stack2.length==0){//只要stack2空了，就把stack1的元素都放进去，如果不是空的，就不操作
        while(this.stack1.length>0){
            this.stack2.push(this.stack1.pop())
        }
      }
      return this.stack2.pop();
    }
    peek(){
        if(this.stack2.length==0){
            while(this.stack1.length>0){
                this.stack2.push(this.stack1.pop())
            }
          }
          return this.stack2[this.stack2.length-1];
    }

    empty(){
        return this.stack1.length==0&&this.stack2.length==0;
    }
}