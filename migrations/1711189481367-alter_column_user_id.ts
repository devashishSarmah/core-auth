import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterColumnUserId1711189481367 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE users
    RENAME COLUMN user_id to id;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE users
    RENAME COLUMN id to user_id;
    `);
  }
}
