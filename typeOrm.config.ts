import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { typeOrmConfig, appConfig } from './src/app.config';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: ['.env'],
  load: [appConfig],
});

const configService = new ConfigService();
const dataSource = new DataSource(<any>typeOrmConfig(configService));

export default dataSource;
