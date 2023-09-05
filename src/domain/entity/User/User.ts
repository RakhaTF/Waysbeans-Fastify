import { IsEmail } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from "typeorm";
import { DeletedUser } from "./DeletedUser";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  age: number;

  @Column({ nullable: true })
  isDeleted: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 3
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 3
  })
  updatedAt: Date;

  @OneToOne(() => DeletedUser, deletedUser => deletedUser.user)
  deletedUser: DeletedUser;
}
