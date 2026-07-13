import { Injectable } from '@nestjs/common'
// 定义和集成 Passport 身份验证策略的基类 定规则
import { PassportStrategy } from '@nestjs/passport';
// 身份验证策略选择jwt
import {  Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // token 在哪里 Bearer 前缀  Authorization 
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 不是直接调用 PassportStrategy(Strategy) 封装 
      // 自动化的去做 
      ignoreExpiration: false,
      secretOrKey: process.env.TOKEN_SECRET || ""
    });
  }
  // JWT  用户对象
  // 需要重写
  async validate(payload) {
    // console.log(payload);
    return {
      id: payload.sub,
      name: payload.name
    }
  }
}