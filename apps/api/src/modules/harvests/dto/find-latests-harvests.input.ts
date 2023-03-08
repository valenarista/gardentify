import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FindLatestsHarvestsInput {
  @Field(() => String)
  userUuid: string;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Boolean)
  includePlant: boolean;
}
