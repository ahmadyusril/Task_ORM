import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1696582446326 implements MigrationInterface {
    name = 'MyMigration1696582446326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vote" ("id" SERIAL NOT NULL, "voterName" character varying(55) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "paslonId" integer, CONSTRAINT "PK_2d5932d46afe39c8176f9d4be72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "paslon" ("id" SERIAL NOT NULL, "paslonName" character varying, "visi" character varying, "image" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_f3367efce21ffeeff1e3f58244d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "party" ("id" SERIAL NOT NULL, "partyName" character varying(55) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_e6189b3d533e140bb33a6d2cec1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "paslon_parties_party" ("paslonId" integer NOT NULL, "partyId" integer NOT NULL, CONSTRAINT "PK_e425aca0c26387aa52aab2358e0" PRIMARY KEY ("paslonId", "partyId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a8557737dc3c339b343b3f7cd9" ON "paslon_parties_party" ("paslonId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c852c3adea5b2badb8c37d52bc" ON "paslon_parties_party" ("partyId") `);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_261e520454f44e8bd073952992e" FOREIGN KEY ("paslonId") REFERENCES "paslon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "paslon_parties_party" ADD CONSTRAINT "FK_a8557737dc3c339b343b3f7cd96" FOREIGN KEY ("paslonId") REFERENCES "paslon"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "paslon_parties_party" ADD CONSTRAINT "FK_c852c3adea5b2badb8c37d52bcd" FOREIGN KEY ("partyId") REFERENCES "party"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "paslon_parties_party" DROP CONSTRAINT "FK_c852c3adea5b2badb8c37d52bcd"`);
        await queryRunner.query(`ALTER TABLE "paslon_parties_party" DROP CONSTRAINT "FK_a8557737dc3c339b343b3f7cd96"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_261e520454f44e8bd073952992e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c852c3adea5b2badb8c37d52bc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a8557737dc3c339b343b3f7cd9"`);
        await queryRunner.query(`DROP TABLE "paslon_parties_party"`);
        await queryRunner.query(`DROP TABLE "party"`);
        await queryRunner.query(`DROP TABLE "paslon"`);
        await queryRunner.query(`DROP TABLE "vote"`);
    }

}
