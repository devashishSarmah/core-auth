import { Controller, Post, Body } from '@nestjs/common';
import { AIAuthRequest, AuthRequest, AuthResponse } from './auth.model';
import { AuthService } from './auth.service';
import { UserAI } from '../user-ai/user-ai.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authRequest: AuthRequest): Promise<AuthResponse> {
    return this.authService.login(authRequest);
  }

  @Post('login/ai')
  async loginAI(
    @Body() authRequest: AIAuthRequest,
  ): Promise<AuthResponse & Partial<UserAI>> {
    return this.authService.loginAI(authRequest);
  }
}
