import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Container } from '../models/container.model';

@ObjectType()
export class BestPerformingContainer extends Container {
  @Field(() => Float)
  totalHarvestsWeight: number;
}

@ObjectType()
export class BestPerformingContainersResponse {
  @Field(() => [BestPerformingContainer], { nullable: true })
  containers?: BestPerformingContainer[];
}
