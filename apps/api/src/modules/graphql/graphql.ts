import { User } from '@modules/users/models/user.model';
import { JwtPayload } from 'jsonwebtoken';

export type GardentifyContext = {
  authTokens: {
    accessToken: JwtPayload | null;
    refreshToken: JwtPayload | null;
  };
  user: User | null;
};
