import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { UserLoginModule } from '../user-login/user-login.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule, UserLoginModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
