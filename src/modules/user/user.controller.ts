import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AIUserPayload, AIUserResponse, UserCreatePayload } from './user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() userData: UserCreatePayload): Promise<User> {
    return await this.userService.createUser(userData);
  }

  @Post('ai/create')
  async createAIUser(
    @Body() AIUserData: AIUserPayload,
  ): Promise<AIUserResponse> {
    return await this.userService.createAIUser(AIUserData);
  }
}
