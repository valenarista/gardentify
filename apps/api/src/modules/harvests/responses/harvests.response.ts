import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Harvest } from '../models/harvests.model';

@ObjectType()
export class HarvestsResponse {
  @Field(() => [Harvest], { nullable: true })
  harvests?: Harvest[];

  @Field(() => Int)
  count: number;

  @Field(() => String)
  cursor: string;

  @Field(() => Boolean)
  hasMore: boolean;
}
