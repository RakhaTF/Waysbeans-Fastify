import { Entity, Column, PrimaryColumn } from "typeorm";
import { IsEmail } from "class-validator";

@Entity()
export class DeletedUser {
    @PrimaryColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    age: number;

    @Column({
        type: 'int',
        width: 10,
    })
    createdAt: number;

    @Column({
        type: 'int',
        width: 10,
    })
    updatedAt: number;
}
