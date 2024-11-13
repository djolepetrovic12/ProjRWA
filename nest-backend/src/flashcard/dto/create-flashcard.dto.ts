import { User } from "src/user/entities/user.entity";
import { contentType } from "../entities/flashcard.entity";
import { IsIn, IsString, isString, MinLength } from "class-validator";

export class CreateFlashcardDto
{
    @IsString()
    @MinLength(2)
    content: string;
    @IsIn(["word" , "phrase" , "sentence" , "general"])
    type: "word" | "phrase" | "sentence" | "general";
    @IsString()
    @MinLength(10)
    explanation: string;
}
