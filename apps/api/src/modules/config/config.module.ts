import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';

import { app, auth, jwt, security, mailer } from './configs';

export interface IConfig {
  app: ConfigType<typeof app>;
  jwt: ConfigType<typeof jwt>;
  security: ConfigType<typeof security>;
  auth: ConfigType<typeof auth>;
  mailer: ConfigType<typeof mailer>;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [app, jwt, security, auth, mailer],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class GlobalConfigModule {}
