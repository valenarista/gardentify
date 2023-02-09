import { registerAs } from '@nestjs/config';

export const app = registerAs('app', () => ({
  port: Number.parseInt(process.env.APP_PORT, 10),
  prefix: process.env.APP_PREFIX,
  name: process.env.APP_NAME,
  clientUrl: process.env.CLIENT_URL,
}));
