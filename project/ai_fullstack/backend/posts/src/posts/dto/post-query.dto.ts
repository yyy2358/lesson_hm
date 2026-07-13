import {
  IsOptional, 
  IsInt, 
  Min
} from 'class-validator'
import { Type } from 'class-transformer'

// 为transfer  object 保驾护航
export class PostQueryDto {
  @IsOptional() // 可选的
  @Type(()=>Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10
}