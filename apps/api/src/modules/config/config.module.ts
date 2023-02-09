import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';

import { app, jwt, security } from './configs';

export interface IConfig {
  app: ConfigType<typeof app>;
  jwt: ConfigType<typeof jwt>;
  security: ConfigType<typeof security>;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [app, jwt, security],
      cache: true,
      isGlobal: true,
      expandVariables: true,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class GlobalConfigModule {}
