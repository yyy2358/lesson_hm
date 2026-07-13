//依赖注入 
import { Injectable } from '@nestjs/common'
// controller 服务于路由， 树根
// service 店里的厨师  Injectable 被注入
@Injectable()  
export class AppService {
  getHello(): string {
    return '你好yeah!!!'
  }
  getWelcome(): string {
    return "欢迎来到nest测试项目"
  }
  handleLogin(username: string, password: string) {
    if (username === "admin" && password === "123456") {
      return {
        status: 200,
        message: "登录成功"
      }
    } else {
      return {
        status: 400,
        message: "登录失败"
      }
    }
  }
}