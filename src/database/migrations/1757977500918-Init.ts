import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1757977500918 implements MigrationInterface {
    name = 'Init1757977500918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "team" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "team_member_ship" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text NOT NULL, "user_id" uuid, "role_id" uuid, "team_id" uuid, CONSTRAINT "PK_56243873778bc0f6a72300393d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_name" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "is_verified" boolean NOT NULL, "is_active" boolean NOT NULL, "is_staff" boolean NOT NULL, "date_joined" TIMESTAMP NOT NULL DEFAULT now(), "lastLogin" TIMESTAMP, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text NOT NULL, "user_id" uuid, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "team_member_ship" ADD CONSTRAINT "FK_6525592416111d334971671a446" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_member_ship" ADD CONSTRAINT "FK_508ff63a52cf0d380b57030a2ff" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_member_ship" ADD CONSTRAINT "FK_18ec6a841040fd2742485c0cf6a" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_6ea2c1c13f01b7a383ebbeaebb0" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_6ea2c1c13f01b7a383ebbeaebb0"`);
        await queryRunner.query(`ALTER TABLE "team_member_ship" DROP CONSTRAINT "FK_18ec6a841040fd2742485c0cf6a"`);
        await queryRunner.query(`ALTER TABLE "team_member_ship" DROP CONSTRAINT "FK_508ff63a52cf0d380b57030a2ff"`);
        await queryRunner.query(`ALTER TABLE "team_member_ship" DROP CONSTRAINT "FK_6525592416111d334971671a446"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "team_member_ship"`);
        await queryRunner.query(`DROP TABLE "team"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
