import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, Unique } from "typeorm";
import { Queue } from "./Queue";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn("uuid", { name: 'id' })
    id: number;

    @Column()
    email: string;

    @Column()
    passowrd: string;

    @Column({ length: 100 , nullable: false })
    firstName: string;

    @Column({ length: 100 , nullable: false })
    lastName: string;

    @OneToMany( type => Queue, queue => queue.admin)
    queues: Queue[];

    @ManyToMany(type => Queue, queue => queue.members)
    enlistedQueues: Queue[];
}
