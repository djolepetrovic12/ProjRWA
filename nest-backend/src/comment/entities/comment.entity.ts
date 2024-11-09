import { StudyResource } from "src/study-resource/entities/study-resource.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'Comments'})
export class Comment {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    content:string;

    @Column()
    dateCreated:Date;

    @Column({name:'user_id'})
    userID:number;

    @Column({name: 'studyResource_id'})
    studyResourceID:number;

    @ManyToOne(()=> User, (user)=>user.comments)
    @JoinColumn({name: 'user_id'})
    user:User;

    @ManyToOne(()=> StudyResource, (studyResource)=>studyResource.comments)
    @JoinColumn({name: 'studyResource_id'})
    studyResource:StudyResource;
    //studyResource

}


