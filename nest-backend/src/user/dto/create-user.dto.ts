import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {

    @IsString()
    @MaxLength(50)
    @MinLength(2)
    name:string;

    @IsString()
    @MaxLength(50)
    @MinLength(2)
    surname:string;

    @IsString()
    @MinLength(3)
    @Matches(/^[a-zA-Z0-9](?!.*[._]{2})[a-zA-Z0-9._]{1,18}[a-zA-Z0-9]$/, {
        message: "username must start with a letter or number, can't contain two or more consecutive dots and/or underscores and must end with a letter or number",
    })
    username:string;

    @IsEmail()
    email:string;
    
    @IsString()
    @MinLength(8)
    password:string;
}
