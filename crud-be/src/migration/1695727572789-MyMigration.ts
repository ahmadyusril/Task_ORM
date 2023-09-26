import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1695727572789 implements MigrationInterface {
    name = 'MyMigration1695727572789'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "todos" ("id" SERIAL NOT NULL, "name" character varying, "visi" character varying, "image" character varying, "posted_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ca8cafd59ca6faaf67995344225" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "todos"`);
    }

}
