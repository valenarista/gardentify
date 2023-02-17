import { PrismaService } from '@modules/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { TwoFactorService } from './twofactor.service';

@Module({
  providers: [PrismaService, TwoFactorService],
  exports: [TwoFactorService],
})
export class TwoFactorModule {}
