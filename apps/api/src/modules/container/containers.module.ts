import { Module } from '@nestjs/common';
import { ContainersResolver } from './containers.resolver';

@Module({
  imports: [],
  providers: [ContainersResolver],
})
export class ContainersModule {}
