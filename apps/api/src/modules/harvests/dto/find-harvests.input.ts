import { Field, InputType, Int } from '@nestjs/graphql';
import { FindHarvestInput } from './find-harvest.input';

@InputType()
export class FindHarvestsInput {
  @Field(() => FindHarvestInput, { nullable: true })
  where?: FindHarvestInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => String, { nullable: true })
  cursor?: string;

  @Field(() => Boolean)
  includePlant: boolean;
}
