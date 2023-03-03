import { registerAs } from '@nestjs/config';

export const weather = registerAs('weather', () => ({
  api: 'https://api.open-meteo.com/v1/forecast',
}));
