import { AuthModule } from '@modules/auth/auth.module';
import { PrismaService } from '@modules/prisma/prisma.service';
import { UsersModule } from '@modules/users/users.module';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RefreshTokensResolver } from './refresh-tokens.resolver';
import { RefreshTokensService } from './refresh-tokens.service';

@Module({
  imports: [ConfigModule, forwardRef(() => AuthModule), UsersModule],
  providers: [PrismaService, RefreshTokensService, RefreshTokensResolver],
  exports: [RefreshTokensService],
})
export class RefreshTokensModule {}
