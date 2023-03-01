import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FindHarvestsInput {
  @Field(() => Int)
  take: number;

  @Field(() => Boolean)
  includePlant: boolean;
}
