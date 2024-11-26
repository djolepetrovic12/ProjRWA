import { User } from "./user";


export interface Comment
{
    id:number;
    content:string;
    dateCreated:Date;
    user:User,
    userID:number;
    studyResourceID:number;
}