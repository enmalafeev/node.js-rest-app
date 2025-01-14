import { Entity, ObjectIdColumn, Column } from "typeorm";

@Entity()
export class User {
  @ObjectIdColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;
}
