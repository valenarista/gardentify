import { Module } from '@nestjs/common';
import { PlantsResolver } from './plants.resolver';

@Module({
  imports: [],
  providers: [PlantsResolver],
})
export class PlantsModule {}
