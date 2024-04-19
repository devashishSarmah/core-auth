import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

import { genSalt, hash } from 'bcrypt';
import { UserCreatePayload } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
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
}
