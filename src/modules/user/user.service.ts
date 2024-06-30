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
      email: _AIUserData.email,
      password_hash: _AIUserData.password_hash,
      full_name: _AIUserData.full_name,
      bio: _AIUserData.bio,
      profile_picture_url: _AIUserData.profile_picture_url,
      website: _AIUserData.website,
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

    await new Promise((resolve, reject) => {
      generateKey('aes', { length: 128 }, (err, key) => {
        if (err) reject(err);
        _AIUserPayload['client_secret'] = key.export().toString('hex');
        resolve(_AIUserPayload['client_secret']);
      });
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
