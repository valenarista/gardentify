import { Module } from '@nestjs/common';
import { ContainersResolver } from './containers.resolver';
import { ContainersService } from './containers.service';

@Module({
  imports: [],
  providers: [ContainersService, ContainersResolver],
})
export class ContainersModule {}
