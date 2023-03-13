import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';

import { app, jwt, security, mailer, weather } from './configs';

export interface IConfig {
  app: ConfigType<typeof app>;
  jwt: ConfigType<typeof jwt>;
  security: ConfigType<typeof security>;
  mailer: ConfigType<typeof mailer>;
  weather: ConfigType<typeof weather>;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [app, jwt, security, mailer, weather],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class GlobalConfigModule {}
