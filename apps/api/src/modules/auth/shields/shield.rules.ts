import { GardentifyContext } from '@modules/graphql/graphql';
import { rule } from 'graphql-shield';

import { getJti, getSub } from '../auth.utils';

export const FORBIDDEN = 'Forbidden';
export const UNAUTHORIZED = 'Unauthorized';

export const isAuthenticated = rule({ cache: 'contextual' })(
  async (_parent, _args, { user }: GardentifyContext) => {
    if (!user) {
      return UNAUTHORIZED;
    }
    return true;
  },
);

export const hasValidRefreshToken = rule()(
  async (
    _parent,
    _args,
    { authTokens: { refreshToken }, refreshTokensService }: GardentifyContext,
  ) => {
    const jti = getJti(refreshToken);
    const sub = getSub(refreshToken);
    if (!jti || !sub) {
      return UNAUTHORIZED;
    }
    return refreshTokensService.validateRefreshToken(jti, sub);
  },
);
