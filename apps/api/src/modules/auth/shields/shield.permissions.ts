import { allow, and, not, shield } from 'graphql-shield';
import {
  FORBIDDEN,
  hasValidRefreshToken,
  isAuthenticated,
} from './shield.rules';

const shieldPermissions = shield(
  {
    Mutation: {
      // '*': isAuthenticated,
      // login: allow,
      // logOut: allow,
      // signUp: allow,
      // refreshToken: and(not(isAuthenticated), hasValidRefreshToken),
    },
  },
  {
    allowExternalErrors: true,
    fallbackError: FORBIDDEN,
  },
);

export default shieldPermissions;
