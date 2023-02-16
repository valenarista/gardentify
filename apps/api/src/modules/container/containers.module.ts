import { PrismaService } from '@modules/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { ContainersResolver } from './containers.resolver';
import { ContainersService } from './containers.service';

@Module({
  imports: [],
  providers: [PrismaService, ContainersService, ContainersResolver],
})
export class ContainersModule {}
