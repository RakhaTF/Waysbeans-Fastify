import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class DeletedUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column({ default: () => "NOW()" })
    deletedAt: Date;
}
