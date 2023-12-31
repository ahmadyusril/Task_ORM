import "reflect-metadata";
import { DataSource } from "typeorm";
import { Paslons } from "./entities/Paslon";
import { Votes } from "./entities/Vote";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "177013",
    database: "testTypeORM",
    synchronize: true,
    logging: false,
    entities: ["src/entities/*.ts"],
    migrations: ["src/migration/*.ts"],
    subscribers: [],
});
