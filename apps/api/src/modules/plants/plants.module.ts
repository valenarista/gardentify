import { PrismaService } from '@modules/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { PlantsResolver } from './plants.resolver';
import { PlantsService } from './plants.service';

@Module({
  imports: [],
  providers: [PrismaService, PlantsService, PlantsResolver],
})
export class PlantsModule {}
