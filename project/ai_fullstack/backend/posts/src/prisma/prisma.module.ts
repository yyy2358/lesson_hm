import { Module, Global } from '@nestjs/common'
import { PrismaService } from './prisma.service'
// 全局注入依赖， nestjs 自动处理
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule{}