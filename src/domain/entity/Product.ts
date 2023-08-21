import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name", type: "varchar" })
  name: string;

  @Column({ type: "decimal", precision: 2, name: "price" })
  price: number;

  @Column({ type: "int", name: "stock" })
  stock: number;

  @Column({ type: "varchar", length: 255, name: "description" })
  description: string;

  @Column({ type: "varchar", name: "photo" })
  photo: string;
}
