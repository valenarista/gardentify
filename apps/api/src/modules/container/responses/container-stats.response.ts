import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ContainerStatsResponse {
  @Field(() => Int, { nullable: true })
  plantsCount?: number;

  @Field(() => Int, { nullable: true })
  harvestsCount?: number;

  @Field(() => Float, { nullable: true })
  grossProduce?: number;
}
