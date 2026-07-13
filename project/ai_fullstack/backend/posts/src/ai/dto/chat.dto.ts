import {
  IsString,
  IsArray,
  ValidateNested,
  IsNotEmpty
} from 'class-validator';
// 类型的转换
import { Type } from 'class-transformer';

export class Message {
  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}

export class ChatDto {
  @IsString()
  @IsNotEmpty()
  id: string; // 唯一标志，一组对话，用于关联对话历史
  // [{
  //   role: 'user',
  //   content: '你好'
  // }]
  @IsArray()
  @ValidateNested({ each: true }) // 约定每个元素都是 Message 类型
  @Type(() => Message)
  messages: Message[]; // Message[]
}