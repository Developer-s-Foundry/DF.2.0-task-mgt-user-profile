import { MigrationInterface, QueryRunner } from "typeorm";

export class ResetUserPassword1758207925973 implements MigrationInterface {
    name = 'ResetUserPassword1758207925973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "reset_token_hash"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "reset_token_expiry"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "reset_token_expiry" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "reset_token_hash" character varying`);
    }

}
