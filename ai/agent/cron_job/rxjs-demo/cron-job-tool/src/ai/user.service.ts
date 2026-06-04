import { Injectable } from '@nestjs/common';

//类型定义 interface和这个都可以定义对象的类型 区别在于type还可以定义简单类型和联合类型
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

@Injectable()
export class UserService {
  //键是string 值是User
  private readonly users = new Map<string, User>([
    [
      '001',
      { id: '001', name: '赵云', email: 'zhaoyun@example.com', role: 'admin' },
    ],
    [
      '002',
      {
        id: '002',
        name: '诸葛亮',
        email: 'zhugeliang@example.com',
        role: 'manager',
      },
    ],
    [
      '003',
      { id: '003', name: '关羽', email: 'guanyu@example.com', role: 'user' },
    ],
    [
      '004',
      { id: '004', name: '张飞', email: 'zhangfei@example.com', role: 'user' },
    ],
    [
      '005',
      { id: '005', name: '刘备', email: 'liubei@example.com', role: 'owner' },
    ],
    [
      '006',
      {
        id: '006',
        name: '黄忠',
        email: 'huangzhong@example.com',
        role: 'user',
      },
    ],
  ]);

  findAll(): User[] {
    return Array.from(this.users.values()); //把map的value解构出来变成一个数组
  }
  findOne(id: string): User | undefined {
    return this.users.get(id);
  }

  create(user: User): User {
    this.users.set(user.id, user);
    return user;
  }
  //更新 局部
  update(id: string, partial: Partial<Omit<User, 'id'>>): User | undefined {
    return this.users.get(id);
  } //遵守ts的约定 一定得是user类型的一部分 partial
}
