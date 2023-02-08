import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateHeightRegistrationInput {
  @Field(() => String)
  plantUuid: string;

  @Field(() => Float)
  height: number;
}
