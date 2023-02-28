import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateHarvestInput {
  @Field(() => String)
  uuid: string;

  @Field(() => Int, { nullable: true })
  quantity?: number;

  @Field(() => Float, { nullable: true })
  weight?: number;
}
