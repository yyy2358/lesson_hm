  import {
    Injectable
  } from '@nestjs/common';
  // nestjs 默认提供的guard, 自动解析req Authorization 
  import { AuthGuard } from '@nestjs/passport';
  // req header Authorization 
  // 关注的是 access_token
  // @nestjs/jwt verfiry 
  // service 看待 依赖注入
  // 继承 AuthGuard 基类
  @Injectable()
  export class JwtAuthGuard extends AuthGuard('jwt'){}