import { Field, ObjectType } from '@nestjs/graphql';
import { ContainerHarvest } from '../models/container-harvest.model';

@ObjectType()
export class ContainerHarvestsResponse {
  @Field(() => [ContainerHarvest])
  harvests: ContainerHarvest[];
}
