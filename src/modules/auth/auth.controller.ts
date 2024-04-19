import { Controller, Post, Body } from '@nestjs/common';
import { AuthRequest, AuthResponse } from './auth.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authRequest: AuthRequest): Promise<AuthResponse> {
    return this.authService.login(authRequest);
  }
}
