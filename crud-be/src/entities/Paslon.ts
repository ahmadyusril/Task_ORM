import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToMany,
    JoinTable,
} from "typeorm";

import { Votes } from "./Vote";
import { Party } from "./Party";

@Entity({ name: "paslon" })
export class Paslons {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    paslonName: string;

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

    @ManyToMany(() => Party, (party) => party.paslon)
    @JoinTable()
    parties:Party[];
}