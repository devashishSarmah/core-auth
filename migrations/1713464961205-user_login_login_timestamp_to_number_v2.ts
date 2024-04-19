import { MigrationInterface, QueryRunner } from "typeorm";

export class UserLoginLoginTimestampToNumberV21713464961205 implements MigrationInterface {
    name = 'UserLoginLoginTimestampToNumberV21713464961205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_login\` ADD \`login_time\` int(6) NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_login\` DROP COLUMN \`login_time\``);
    }

}
