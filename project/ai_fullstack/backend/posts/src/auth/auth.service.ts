import {
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import {
  PrismaService 
} from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
// nestjs 内置了jwt 模块 
// 需要安装的 性能比较好
// @nestjs 插件式  企业级同时保持小巧
// 注入的方式注入Auth模块
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto) {
    const { name, password } = loginDto;
    // name 查询
    const user = await this.prisma.user.findUnique({
      where: {
        name
      }
    })
    if(!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('用户名或密码错误')
    }
    console.log(user);
    // hased password 比对？

    // 颁发token
    // 模块化分离， 业务专注
    const tokens = await this.generateTokens(user.id.toString(), user.name);
    return {
      ...tokens,
      user:{
        id: user.id.toString(),
        name: user.name
      }
    }
  }
  async refreshToken(rt: string) {
    try {
      // decode 
      const payload = await this.jwtService.verifyAsync(rt, {
        secret:process.env.TOKEN_SECRET
      });
      console.log(payload, "??????");
      return this.generateTokens(payload.sub, payload.name);
    } catch(e) {
      throw new UnauthorizedException('Refresh Token 已失效，请重新登录')
    }
  }
  // OOP private 方法 复杂度剥离
  private async generateTokens(id: string, name: string) {
    // 用户信息关键 JSON Object 
    // 马上用于签发token, 发令枪先装填弹药（payload），生成token,先要准备用户对象一样
    const payload = {
      sub: id, // subject 主题 JWT 中规定的 关键字端
      name
    };

    const [at, rt] = await Promise.all([
      // 颁发了两个token  access_token
      this.jwtService.signAsync(payload, {
        expiresIn: '15m', // 有效期 15分钟 更安全 被中间人攻击
        secret: process.env.TOKEN_SECRET
      }),
      // refresh_token  刷新
      // 7d 服务器接受我们，用于refresh 
      // 服务器再次生成两个token 给我们
      // 依然使用 15m token 请求 
      this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.TOKEN_SECRET
      }),
    ])
    return {
      access_token: at,
      refresh_token: rt
    }
  }
}