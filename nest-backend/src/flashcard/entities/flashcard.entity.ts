import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";

export type contentType = "word" | "phrase" | "sentence" | "general";

@Entity({name:'flashcards'})
export class Flashcard {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    content: string;

    @Column()
    type: "word" | "phrase" | "sentence" | "general";

    @Column()
    explanation: string;

    @Column({name:'user_id'})
    userID: number;

    @ManyToOne(()=> User, (user)=>user.flashcards, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'user_id'})
    user:User;

}