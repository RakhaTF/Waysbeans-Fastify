import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Log {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    action: string;

    @Column()
    ip: number;

    @Column()
    browser: string;

    @Column()
    time: number;
}
