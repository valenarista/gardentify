import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Plant } from '../models/plant.model';

@ObjectType()
export class PlantsResponse {
  @Field(() => [Plant], { nullable: true })
  plants?: Plant[];

  @Field(() => Int)
  count: number;

  @Field(() => String)
  cursor: string;

  @Field(() => Boolean)
  hasMore: boolean;
}
