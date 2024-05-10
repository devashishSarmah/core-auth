import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserLoginService } from '../user-login/user-login.service';
import { AuthResponse, AuthRequest, AIAuthRequest } from './auth.model';

import { compare } from 'bcrypt';
import { UserAiService } from '../user-ai/user-ai.service';

import { AES, enc } from 'crypto-js';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userLoginService: UserLoginService,
    private readonly userAiService: UserAiService,
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

  async loginAI(authRequest: AIAuthRequest): Promise<AuthResponse> {
    function verifyToken(token, clientId, clientSecret) {
      const secretKey = 'your-secret-key'; // Must be the same key used for encryption

      let bytes;
      try {
        bytes = AES.decrypt(token, secretKey);
      } catch (error) {
        return false; // Invalid token
      }

      const decryptedData = JSON.parse(bytes.toString(enc.Utf8));
      return (
        decryptedData.clientId === clientId &&
        decryptedData.clientSecret === clientSecret
      );
    }

    const aiUser = await this.userAiService.getAIUserClientSecret(
      authRequest.client_id,
    );

    if (!aiUser) {
      throw new Error('Invalid Client ID');
    }

    const isValid = verifyToken(
      authRequest.token,
      authRequest.client_id,
      aiUser.client_id,
    );

    if (!isValid) {
      throw new Error('Token not valid');
    }

    const userLoginData = await this.userLoginService.createUserLogin({
      user: aiUser.user,
    });

    return {
      token: userLoginData.session_id,
      username: aiUser.user.username,
      profile_picture: aiUser.user.profile_picture_url,
    };
  }
}
