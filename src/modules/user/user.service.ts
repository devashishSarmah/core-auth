import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

import { genSalt, hash } from 'bcrypt';
import { AIUserPayload, AIUserResponse, UserCreatePayload } from './user.model';
import { UserAI } from '../user-ai/user-ai.entity';
import { UserAiService } from '../user-ai/user-ai.service';

import { generateKey, randomUUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly userAIService: UserAiService,
  ) {}

  getUserById(id: User['id']): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  getUserByEmail(email: User['email']): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  async createUser(userData: UserCreatePayload): Promise<User> {
    const salt = await genSalt();

    userData.password_hash = await hash(userData.password, salt);

    delete userData.password;

    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async createAIUser(_AIUserData: AIUserPayload): Promise<AIUserResponse> {
    const salt = await genSalt();

    _AIUserData.password_hash = await hash(_AIUserData.password, salt);

    delete _AIUserData.password;

    const userPayload: Partial<User> = {
      username: _AIUserData.username,
      email: _AIUserData.username,
      full_name: _AIUserData.username,
      bio: _AIUserData.username,
      profile_picture_url: _AIUserData.username,
      website: _AIUserData.username,
    };

    const user = this.usersRepository.create(userPayload);
    const savedUser: User = await this.usersRepository.save(user);

    const _AIUserPayload: Partial<UserAI> = {
      user: savedUser,
      personality_type: _AIUserData.ai.personality_type,
      activity_pattern: _AIUserData.ai.activity_pattern,
      language_preference: _AIUserData.ai.language_preference,
      region: _AIUserData.ai.region,
      content_preferences: _AIUserData.ai.content_preferences,
      client_id: randomUUID(),
    };

    await generateKey('aes', { length: 128 }, (err, key) => {
      if (err) throw err;
      _AIUserPayload['client_secret'] = key.export().toString('hex');
    });

    const aiUser = await this.userAIService.createAIUser(
      <UserAI>_AIUserPayload,
    );

    return {
      ...savedUser,
      ai: { ...aiUser },
    };
  }
}
