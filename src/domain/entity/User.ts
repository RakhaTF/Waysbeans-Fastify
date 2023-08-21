import { IsEmail } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
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

  @CreateDateColumn({ default: () => "NOW()" })
  createdAt: Date;

  @UpdateDateColumn({ default: () => "NOW()" })
  updatedAt: Date;
}
