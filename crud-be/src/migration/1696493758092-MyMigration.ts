import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1696493758092 implements MigrationInterface {
    name = 'MyMigration1696493758092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "votes" ("id" SERIAL NOT NULL, "voterName" character varying(55) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "paslonId" integer, CONSTRAINT "PK_f3d9fd4a0af865152c3f59db8ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "paslon" ("id" SERIAL NOT NULL, "name" character varying, "visi" character varying, "image" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_f3367efce21ffeeff1e3f58244d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_8eb6a34f4e7ee586af421a75bc9" FOREIGN KEY ("paslonId") REFERENCES "paslon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_8eb6a34f4e7ee586af421a75bc9"`);
        await queryRunner.query(`DROP TABLE "paslon"`);
        await queryRunner.query(`DROP TABLE "votes"`);
    }

}
