import {
    IsEmail,
    IsNotEmpty,
    MaxLength
} from 'class-validator';
export class CreateUserDto {
    @IsNotEmpty()
    @MaxLength(50)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(50)
    email: string;

}
//id 自增 日期自动 所以只需传这两个