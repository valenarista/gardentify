import { Module } from '@nestjs/common';
import { ContainersResolver } from './containers.resolver';
import { ContainersService } from './containers.service';

@Module({
  imports: [],
  providers: [ContainersResolver, ContainersService],
})
export class ContainersModule {}
