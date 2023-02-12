import { registerAs } from '@nestjs/config';

export const auth = registerAs('auth', () => ({
  redirect: 'http://localhost:3000',
  discordCallback: 'http://localhost:4000/api/v1/auth/discord/redirect',
}));
