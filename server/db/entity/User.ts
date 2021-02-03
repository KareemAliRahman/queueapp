import { IsEmail, IsNotEmpty, isNotEmpty, isValidationOptions, Length, Min, minLength, MinLength } from "class-validator";
import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from "typeorm";
import { Queue } from "./Queue";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn("uuid", { name: 'id' })
    id: number;

    @Column({unique: true, nullable: false})
    @IsEmail()
    email: string;

    @Column({nullable: false})
    @IsNotEmpty()
    @MinLength(5)
    password: string;

    @Column({ length: 50 , nullable: false })
    @IsNotEmpty()
    @MinLength(1)
    firstName: string;

    @Column({ length: 50 , nullable: false })
    @IsNotEmpty()
    @MinLength(1)
    lastName: string;

    @OneToMany( type => Queue, queue => queue.admin)
    queues: Queue[];

    @ManyToMany(type => Queue, queue => queue.members)
    enlistedQueues: Queue[];
}
