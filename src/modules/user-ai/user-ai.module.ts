import { Module } from '@nestjs/common';
import { UserAiService } from './user-ai.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAI } from './user-ai.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAI])],
  providers: [UserAiService],
  exports: [UserAiService],
})
export class UserAiModule {}
