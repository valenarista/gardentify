import { PrismaService } from '@modules/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { HarvestsResolver } from './harvests.resolver';
import { HarvestsService } from './harvests.service';

@Module({
  imports: [],
  providers: [PrismaService, HarvestsService, HarvestsResolver],
})
export class HarvestsModule {}
