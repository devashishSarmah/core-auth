import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserCreatePayload } from './user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() userData: UserCreatePayload): Promise<User> {
    return await this.userService.createUser(userData);
  }
}
