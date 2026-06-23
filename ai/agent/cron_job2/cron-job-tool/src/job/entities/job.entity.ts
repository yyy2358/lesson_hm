import { Entity, PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn } from 'typeorm';
//@Column() 是字段装饰器，把实体类属性映射为数据库表的列（字段）。

export type JobType = 'cron' | 'every' | 'at';

@Entity()
export class Job {//会有一个算法 保证绝对唯一
  @PrimaryGeneratedColumn('uuid')//uuid作为数据库主键，替代自增ID，避免暴露业务自增规律
  id: string;

  @Column({type:'text'})//映射为text长文本类型字段
  instruction: string;

  @Column({type:'varchar',length:10,default:'cron'})
  type: JobType;
  //cron类型使用
  @Column({type:'varchar',length:100,nullable:true})
  cron: string | null;//存放cron类型任务的表达式；非cron类任务为null

    //every类型使用
  @Column({type:'int',nullable:true})
  everyMs: number | null;//存放every类型任务的间隔毫秒数；非间隔类任务为null
    //at类型使用
  @Column({type:'timestamp',nullable:true})
  at: Date | null;//存放at类型任务的执行时间；非at类任务为null

  @Column({default:true})
  isEnabled: boolean;//是否启用,默认启用

  @Column({type:'timestamp',nullable:true})
  lastRunTime: Date | null;//存放任务上次运行时间；非间隔类任务为null

  @CreateDateColumn({type:'timestamp'})
  createdAt: Date;//创建时间

  @UpdateDateColumn({type:'timestamp'})
  updatedAt: Date;//更新时间
}