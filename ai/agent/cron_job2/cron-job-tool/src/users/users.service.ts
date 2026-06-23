import { Injectable,Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class UsersService {
  @Inject(EntityManager)
  entityManager: EntityManager;
  create(createUserDto: CreateUserDto) {
    return this.entityManager.save(User, createUserDto);//保存用户实体
  }

  findAll() {
    return this.entityManager.find(User);//查询所有用户实体
  }

  findOne(id: number) {
    return this.entityManager.findOne(User, {where:{id}});//查询用户实体
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.entityManager.update(User, id, updateUserDto);//更新用户实体
  }

  remove(id: number) {
    return this.entityManager.delete(User, id);//删除用户实体
  }
}
