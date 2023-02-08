import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class FindHeightRegistrationInput {
  @Field(() => String, { nullable: true })
  uuid?: string;

  @Field(() => Float, { nullable: true })
  height?: number;
}
