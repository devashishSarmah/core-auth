import { Injectable, Req, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLogin } from './user-login.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';

@Injectable()
export class UserLoginService {
  constructor(
    @InjectRepository(UserLogin)
    private userLoginRepository: Repository<UserLogin>,
    @Req() @Inject('REQUEST') private request: Request,
  ) {}

  createUserLogin(userLoginData: Partial<UserLogin>): Promise<UserLogin> {
    userLoginData.ip_address =
      this.request.ip ||
      (this.request.headers['x-forwarded-for'] as string) ||
      this.request.socket.remoteAddress;
    const userLogin = this.userLoginRepository.create(userLoginData);
    return this.userLoginRepository.save(userLogin);
  }
}
