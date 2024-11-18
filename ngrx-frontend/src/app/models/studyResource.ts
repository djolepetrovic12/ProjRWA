import { User } from "./user";


export interface StudyResource
{
    id:number,
    title:string,
    description:string,
    dateUploaded:Date,
    resourceLink:string,
    userID:number,
    user:User;
}