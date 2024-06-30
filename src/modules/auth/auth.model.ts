import { UserLogin } from '../user-login/user-login.entity';
import { User } from '../user/user.entity';

export type AuthRequest = {
  email: User['email'];
  password: string;
};

export type AuthResponse = {
  token: UserLogin['session_id'];
  username: User['username'];
  profile_picture: User['profile_picture_url'];
};

/**
 * @token encrypted(with client_secret) stringified json with client_id
 */
export type AIAuthRequest = {
  token: string;
  client_id: string;
};
