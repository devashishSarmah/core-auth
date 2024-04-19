import { Module } from '@nestjs/common';
import { UserLoginService } from './user-login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLogin } from './user-login.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserLogin])],
  providers: [UserLoginService],
  exports: [UserLoginService],
})
export class UserLoginModule {}
