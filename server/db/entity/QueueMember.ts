import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Queue } from "./Queue";

@Entity()
export class QueueMember extends BaseEntity{

    @PrimaryGeneratedColumn("uuid", { name: 'id' })
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @OneToMany( type => Queue, queue => queue.user)
    queues: Queue[];
}
