import { registerAs } from '@nestjs/config';

export const jwt = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  accessExpiry: /^\d+$/.test(process.env.JWT_ACCESS_EXPIRY)
    ? +process.env.JWT_ACCESS_EXPIRY
    : process.env.JWT_ACCESS_EXPIRY,
  refreshExpiry: 60 * 60 * 24 * 7,
}));
