import { registerAs } from '@nestjs/config';

export const mailer = registerAs('mailer', () => ({
  username: process.env.MAIL_USERNAME,
  password: process.env.MAIL_PASSWORD,
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true,
}));
