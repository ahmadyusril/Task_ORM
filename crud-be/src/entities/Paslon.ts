import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";

import { Votes } from "./Vote";

@Entity({ name: "paslon" })
export class Paslons {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    visi: string;

    @Column({ nullable: true })
    image: string;

    @CreateDateColumn({ type: "timestamp with time zone" })
    createdAt: Date;
  
    @UpdateDateColumn({ type: "timestamp with time zone" })
    updatedAt: Date;
  
    @OneToMany(() => Votes, (votes) => votes.paslon)
    votes: Votes[];
}