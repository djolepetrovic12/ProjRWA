import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "src/comment/entities/comment.entity";

@Entity({name:'studyResources'})
export class StudyResource {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    description:string;

    @Column()
    dateUploaded:Date;

    @Column({unique:true})
    resourceLink:string;

    @Column({name:'user_id'})
    userID: number;

    @OneToMany( () =>Comment, (comments)=> comments.studyResource)
    comments:Comment[];

    @ManyToOne(()=>User, (user)=> user.studyResources)
    @JoinColumn({name: 'user_id'})
    user:User;


    

}
