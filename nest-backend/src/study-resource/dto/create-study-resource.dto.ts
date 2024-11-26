import { IsDateString, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateStudyResourceDto 
{
    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    title:string;

    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    description:string;

    //@IsDateString()
    //dateUploaded:Date;

    @IsString()
    @MinLength(1)
    resourceLink?:string;

    //@IsNumber()
    //userID: number;

}
