import { JwtPayload, verify } from 'jsonwebtoken';
import { AuthTokens } from './models/token.model';
import { config } from 'dotenv';

config();

type JWTAuthTokens = {
  accessToken: JwtPayload | null;
  refreshToken: JwtPayload | null;
};

export type RequestWithCookies = Request & {
  cookies?: { auth?: AuthTokens };
};

export const getTokensFromRequest = (
  req: RequestWithCookies,
): JWTAuthTokens => {
  const { cookies } = req;

  const accessToken = cookies?.auth
    ? decodeJWTToken(cookies.auth.accessToken)
    : null;

  const refreshToken = cookies?.auth
    ? decodeJWTToken(cookies.auth.refreshToken)
    : null;

  return { accessToken, refreshToken };
};

export const getUserUUIDFromToken = (
  token: JwtPayload | null,
): string | null => {
  if (!token?.sub) return null;

  return token.sub;
};

const decodeJWTToken = (token: string) => {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    return verify(token, jwtSecret) as JwtPayload;
  } catch (err) {
    return null;
  }
};
