import { Flashcard } from "src/flashcard/entities/flashcard.entity";
import { StudyResource } from "src/study-resource/entities/study-resource.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Comment } from "src/comment/entities/comment.entity";


@Entity({name:'users'})
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    role: 'ADMIN' | 'STUDENT' | 'PROFESSOR';

    @Column()
    name:string;

    @Column()
    surname:string;

    @Column({unique:true})
    email:string;

    @Column({unique:true})
    username:string;

    @Column()
    password:string;
    
    @OneToMany(() => Flashcard, (flashcards)=>flashcards.user)
    flashcards:Flashcard[];

    @OneToMany(() => StudyResource, (studyResource)=>studyResource.user)
    studyResources:StudyResource[];

    @OneToMany(() => Comment, (comment)=>comment.user)
    comments:Comment[];
    

}
