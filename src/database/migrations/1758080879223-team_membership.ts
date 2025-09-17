import { MigrationInterface, QueryRunner } from "typeorm";

export class TeamMembership1758080879223 implements MigrationInterface {
    name = 'TeamMembership1758080879223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "team_membership" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text NOT NULL, "user_id" uuid, "role_id" uuid, "team_id" uuid, CONSTRAINT "PK_b4f8962cc9081c5d30e78cecefc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "team_membership" ADD CONSTRAINT "FK_59a1695bd2bff4ea225cc211dac" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_membership" ADD CONSTRAINT "FK_bd07e478edc585e4edf88e3f7d4" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_membership" ADD CONSTRAINT "FK_91c8aa3bf9a3a7a3918fcea43a0" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team_membership" DROP CONSTRAINT "FK_91c8aa3bf9a3a7a3918fcea43a0"`);
        await queryRunner.query(`ALTER TABLE "team_membership" DROP CONSTRAINT "FK_bd07e478edc585e4edf88e3f7d4"`);
        await queryRunner.query(`ALTER TABLE "team_membership" DROP CONSTRAINT "FK_59a1695bd2bff4ea225cc211dac"`);
        await queryRunner.query(`DROP TABLE "team_membership"`);
    }

}
