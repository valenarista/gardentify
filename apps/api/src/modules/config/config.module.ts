import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';

import { app, auth, jwt, security } from './configs';

export interface IConfig {
  app: ConfigType<typeof app>;
  jwt: ConfigType<typeof jwt>;
  security: ConfigType<typeof security>;
  auth: ConfigType<typeof auth>;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [app, jwt, security, auth],
      cache: true,
      isGlobal: true,
      expandVariables: true,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class GlobalConfigModule {}
