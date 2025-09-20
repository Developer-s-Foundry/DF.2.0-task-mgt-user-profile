import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class CreateNewMigration1758175533293 implements MigrationInterface {
  name = 'CreateNewMigration1758175533293';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('user', [
      new TableColumn({
        name: 'reset_token_hash',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }),
      new TableColumn({
        name: 'reset_token_expiry',
        type: 'timestamp',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'reset_token_expiry');
    await queryRunner.dropColumn('user', 'reset_token_hash');
  }
}
