import { IsDateString, IsNotEmpty, IsNumber, isNumber, IsString, MinLength } from "class-validator";

export class CreateCommentDto 
{
    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    content:string;
    @IsDateString()
    dateCreated:Date;
    @IsNumber()
    userID:number;
    @IsNumber()
    studyResourceID:number;
}
