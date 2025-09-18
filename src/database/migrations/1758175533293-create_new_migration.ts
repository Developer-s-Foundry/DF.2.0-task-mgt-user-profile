import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNewMigration1758175533293 implements MigrationInterface {
    name = 'CreateNewMigration1758175533293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`reset_token_hash\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`reset_token_expiry\` timestamp NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`reset_token_expiry\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`reset_token_hash\``);
    }

}
