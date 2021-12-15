import { Length } from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Queue extends BaseEntity {
  @PrimaryGeneratedColumn("rowid", { name: "id" })
  id: string;

  //qrcode dataurl
  @Column({ nullable: true })
  qrcode: string;

  @Column({ length: 100, nullable: false })
  @Length(1, 100)
  name: string;

  @Column({ length: 100, nullable: true })
  @Length(1, 100)
  organization: string;

  @Column({ length: 300, nullable: true })
  @Length(1, 300)
  description: string;

  @Column({ nullable: false })
  address: string;

  @Column("timestamp with time zone", { nullable: false })
  startsAt: Date;

  @ManyToOne((type) => User, (admin) => admin.queues)
  admin: User;

  @ManyToMany((type) => User, (member) => member.enlistedQueues)
  @JoinTable()
  members: User[];
}
