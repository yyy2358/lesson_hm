import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,//日期列
    UpdateDateColumn,
} from 'typeorm';
//User Entity
@Entity()
export class User {
    @PrimaryGeneratedColumn()//装饰器模式 自增
    id: number;
    
    @Column({
        length: 50
    })
    name: string;
    
    @Column({
        length: 50
    })
    email: string;

    @CreateDateColumn({
        type: 'timestamp',//自动填充当前时间戳
    })
    createdAt: Date;
    
    @UpdateDateColumn({
        type: 'timestamp',
    })
    updatedAt: Date;
}
