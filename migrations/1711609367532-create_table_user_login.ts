import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUserLogin1711609367532 implements MigrationInterface {
  name = 'CreateTableUserLogin1711609367532';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user_login\` (\`session_id\` varchar(36) NOT NULL, \`login_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`ip_address\` varchar(45) NOT NULL, \`user_id\` int NOT NULL, PRIMARY KEY (\`session_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_login\` ADD CONSTRAINT \`FK_3867141329f8f8ce448af93b4b5\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_login\` DROP FOREIGN KEY \`FK_3867141329f8f8ce448af93b4b5\``,
    );
    await queryRunner.query(`DROP TABLE \`user_login\``);
  }
}
