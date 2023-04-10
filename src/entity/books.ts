import { Entity, Column, BaseEntity, ObjectIdColumn } from "typeorm";
import "reflect-metadata";

@Entity()
export class Book extends BaseEntity {
  @ObjectIdColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  year: string;

  @Column()
  author: string;
}
