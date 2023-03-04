import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindWeekHarvestsInput {
  @Field(() => String)
  userUuid: string;
}
