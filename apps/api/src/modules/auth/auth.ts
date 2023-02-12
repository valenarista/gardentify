import { User } from '@prisma/client';

export type UserDetails = {
  username: string;
  oauthId: string;
  avatar: string;
  accessToken: string;
  refreshToken: string;
};

export type Done = (err: Error, user: User) => void;

export interface AuthenticationProvider {
  validateUser(details: UserDetails);
  createUser(details: UserDetails);
  findUser(oauthId: string): Promise<User | undefined>;
}
