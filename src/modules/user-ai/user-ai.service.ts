import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAI } from './user-ai.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class UserAiService {
  constructor(
    @InjectRepository(UserAI) private userAIRepository: Repository<UserAI>,
  ) {}

  getAIUserByUserId(id: User['id']): Promise<UserAI> {
    return this.userAIRepository.findOneBy({ ai_user_id: id });
  }

  createAIUser(userAI: UserAI): Promise<UserAI> {
    return this.userAIRepository.save(this.userAIRepository.create(userAI));
  }
}
