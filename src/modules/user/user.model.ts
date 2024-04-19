import { User } from './user.entity';

export type UserCreatePayload = Partial<User> & { password: string };
