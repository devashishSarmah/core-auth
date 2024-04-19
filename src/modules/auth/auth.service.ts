import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserLoginService } from '../user-login/user-login.service';
import { AuthResponse, AuthRequest } from './auth.model';

import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userLoginService: UserLoginService,
  ) {}

  async login(authRequest: AuthRequest): Promise<AuthResponse> {
    const user = await this.userService.getUserByEmail(authRequest.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await compare(
      authRequest.password,
      user.password_hash,
    );

    if (!isPasswordValid) {
      throw new NotFoundException('Invalid password');
    }

    const userLoginData = await this.userLoginService.createUserLogin({ user });

    const authResponse: AuthResponse = {
      token: userLoginData.session_id,
      username: user.username,
      profile_picture: user.profile_picture_url,
    };

    return authResponse;
  }
}
