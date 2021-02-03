import { Length } from "class-validator";
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Queue extends BaseEntity {

  @PrimaryGeneratedColumn("rowid", { name: 'id' })
  id: number;

  @Column({ length: 100 , nullable: false })
  @Length(1, 100)
  name: string;

  @Column({ length: 100 , nullable: true })
  @Length(1, 100)
  organization: string;

  @Column({ length: 300 , nullable: true })
  @Length(1, 300)
  Description: string;

  @ManyToOne(type => User, admin => admin.queues)
  admin: User;

  @ManyToMany(type => User, member => member.queues)
  members: User[];
}