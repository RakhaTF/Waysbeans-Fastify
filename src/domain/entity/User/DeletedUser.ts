import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class DeletedUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    deletedAt: Date;
    
    @OneToOne(() => User, user => user.deletedUser)
    @JoinColumn()
    user: User;
}
