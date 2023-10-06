import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
} from "typeorm";

import { Paslons } from "./Paslon";

@Entity({ name: "party" })
export class Party {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 55 })
    partyName: string;

    @CreateDateColumn({ type: "timestamp with time zone"})
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp with time zone" })
    updatedAt: Date;

    @ManyToMany(() => Paslons, (paslons) => paslons.votes)
    paslon: Paslons[]

}