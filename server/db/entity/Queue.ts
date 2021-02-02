import { BaseEntity, Column, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


export class Queue extends BaseEntity {

  @PrimaryGeneratedColumn("rowid", { name: 'id' })
  id: number;

  @Column({ type: "string", length: 100 , nullable: false })
  name: string;

  @Column({ type: "string", length: 100 , nullable: true })
  organization: string;

  @Column({ type: "string", length: 300 , nullable: true })
  Description: string;

  @ManyToOne(type => User, admin => admin.queues)
  admin: User;

  @ManyToMany(type => User, member => member.queues)
  members: User[];
}