import { Module } from '@nestjs/common';
import { UserLoginService } from './user-login.service';

@Module({
  providers: [UserLoginService]
})
export class UserLoginModule {}
