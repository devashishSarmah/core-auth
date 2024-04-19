import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from './config';

import * as dotenv from 'dotenv';

dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k: string) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != config.ENVIRONMENT.DEV;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',

      host: this.getValue('MYSQL_HOST'),
      port: parseInt(this.getValue('MYSQL_PORT')),
      username: this.getValue('MYSQL_USER'),
      password: this.getValue('MYSQL_PASSWORD'),
      database: this.getValue('MYSQL_DATABASE'),

      entities: [`${__dirname}/../**/*.entity.{ts,js}`],

      migrationsTableName: 'migration',

      migrations: [getMigrationDirectory()],

      ssl: this.isProduction(),
    };
  }
}

function getMigrationDirectory() {
  const directory = process.env.DIR ? process.env.DIR : `${__dirname}`;
  return `${directory}/migrations/**/*{.ts,.js}`;
}

const configService: ConfigService = new ConfigService(process.env);

export default configService;
