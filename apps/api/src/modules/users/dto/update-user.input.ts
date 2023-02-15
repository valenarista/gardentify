import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  uuid: string;

  @Field(() => String, { nullable: true })
  username?: string;
}
