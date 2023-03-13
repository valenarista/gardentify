import { IConfig } from '@modules/config/config.module';
import { PrismaService } from '@modules/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MailerService } from '@modules/mailer/mailer.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { PasswordService } from './password.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TwoFactorService } from '@modules/twofactor/twofactor.service';
import { RefreshTokensModule } from '@modules/refresh-tokens/refresh-tokens.module';

@Module({
  imports: [
    ConfigModule,
    RefreshTokensModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService<IConfig>) => {
        return {
          secret: configService.get('jwt', { infer: true }).secret,
          signOptions: {
            expiresIn: configService.get('jwt', { infer: true }).accessExpiry,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    PrismaService,
    AuthService,
    AuthResolver,
    JwtStrategy,
    MailerService,
    GqlAuthGuard,
    TwoFactorService,
    PasswordService,
  ],
  exports: [GqlAuthGuard, AuthService, JwtModule],
})
export class AuthModule {}
