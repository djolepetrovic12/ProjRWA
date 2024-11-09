import { User } from "src/user/entities/user.entity";
import { contentType } from "../entities/flashcard.entity";
import { IsIn, IsString, isString } from "class-validator";

export class CreateFlashcardDto
{
    @IsString()
    content: string;
    @IsIn(["word" , "phrase" , "sentence" , "general"])
    type: "word" | "phrase" | "sentence" | "general";
    @IsString()
    explanation: string;
}
