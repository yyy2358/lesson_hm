import { Controller, Get, Post, Body, Inject } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  // service 实例
  constructor(
    @Inject('PG_CONNECTION') private readonly db: any,
    private readonly appService: AppService
  ) {}

  @Get()
  getHello() :string {
    return this.appService.getHello()
  }

  @Get('welcome')
  getWelcome() :string {
    return this.appService.getWelcome()
  }

  @Post('login')
  login(@Body() body: { username: string, password: string }) {
    const { username, password } = body;
    console.log(username, password);
    if (!username || !password) {
      return {
        code: 400,
        message: "用户名或密码不能为空"
      }
    }
    if (password.length < 6) {
      return {
        code: 400,
        message: "密码不能少于6位"
      }
    }
    return this.appService.handleLogin(username, password)
  }

  @Get('db-test')
  async testConnection() {
    try {
      const res = await this.db.query('SELECT * from users');
      return {
        status: '连接成功',
        data: res.rows
      }
    } catch(error) {
      return {
        status: '连接失败',
        error: error.message
      }
    }
  }
}