import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as path from 'path';

const envFilePath = path.resolve(process.cwd(), '.env');

console.log(`Environment: ${envFilePath}`);

dotenv.config({ path: envFilePath });

async function bootstrap() {
  console.log(process.env);
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
