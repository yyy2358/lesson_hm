import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { z } from 'zod';
import { tool } from '@langchain/core/tools';
import { ToolModule } from '../tool/tool.module';
@Module({
  imports: [UsersModule,ToolModule],
  controllers: [AiController],
  providers: [
    AiService,
    
    // UsersService,
    // //provide 动态创建的
    // //将model 从逻辑中剥离出来
    // //llm作为provide提供
    // {
    //   provide: 'DB_USERS_CRUD_TOOL',
    //   useFactory:(usersService:UsersService) =>{
    //     const dbUsersCrudArgsSchema = z.object({
    //       //枚举
    //       action: z
    //       .enum(['create', 'list','get', 'update', 'delete'])
    //       .describe('要执行的操作:create、list、get、update、delete'),
    //       id:z
    //       .number()
    //       .int()
    //       .positive()
    //       .optional()
    //       .describe('用户ID(get/update/delete时需要)'),
    //       name:z
    //       .string()
    //       .min(1)
    //       .max(50)
    //       .optional()
    //       .describe('用户姓名(create/update时可用)'),//清晰的告诉权限
    //       email:z
    //       .string()
    //       .email()
    //       .max(50)
    //       .optional()
    //       .describe('用户邮箱(create/update时可用)'),
    //     });
    //     return tool(
    //       async ({
    //         action,
    //         id,
    //         name,
    //         email
    //       }: {
    //         action: 'create' | 'list' | 'get' | 'update' | 'delete';
    //         id?: number;
    //         name?: string;
    //         email?: string;//对函数参数做ts的约定 可选  
    //       }) => {
    //         switch (action) {
    //           case 'create' : {
    //             if (!name || !email) {
    //               return `创建用户需要同时提供name和email。`
    //             }
    //             const created = await usersService.create({
    //               name,
    //               email,
    //             });
    //             return `已创建用户：ID=:${created.id},
    //             姓名=${created.name},
    //             邮箱=${created.email}`;
    //           }
    //           case 'list' : {}
    //           case 'get' : {}
    //           case 'update' : {}
    //           case 'delete' : {}
    //           default:
    //             return `不支持的操作:${action}`;
    //         }
    //       },
    //       {
    //         name:'db_users_crud',
    //         description:`用于数据库users表执行增删改查操作。通过action字段选择
    //          create/list/get/update/delete,并按需提供id、name、email等参数`,
    //         schema:dbUsersCrudArgsSchema
    //       }
    //     )
    //   }
    // }//把tool分离出去
  ],
})
export class AiModule {}
