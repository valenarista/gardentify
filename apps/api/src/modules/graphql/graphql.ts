import { RefreshTokensService } from '@modules/refresh-tokens/refresh-tokens.service';
import { User } from '@modules/users/models/user.model';
import { UsersService } from '@modules/users/users.service';
import { JwtPayload } from 'jsonwebtoken';

export type GardentifyContext = {
  authTokens: {
    accessToken: JwtPayload | null;
    refreshToken: JwtPayload | null;
  };
  refreshTokensService: RefreshTokensService;
  usersService: UsersService;
  user: User | null;
};
