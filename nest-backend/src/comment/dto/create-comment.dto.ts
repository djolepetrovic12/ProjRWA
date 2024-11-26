import { IsDateString, IsNotEmpty, IsNumber, isNumber, IsString, MinLength } from "class-validator";

export class CreateCommentDto 
{
    @IsString()
    @MinLength(5)
    @IsNotEmpty()
    content:string;
    @IsNumber()
    userID:number;
    @IsNumber()
    studyResourceID:number;
}
