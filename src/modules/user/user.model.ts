import { UserAI } from '../user-ai/user-ai.entity';
import { User } from './user.entity';

export type UserCreatePayload = Partial<User> & { password: string };

export type AIUserPayload = UserCreatePayload & { ai: Partial<UserAI> };

export type AIUserResponse = User & { ai: Partial<UserAI> };
