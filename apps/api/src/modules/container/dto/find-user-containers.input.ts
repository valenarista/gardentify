import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindUserContainersInput {
  @Field(() => String)
  userUuid: string;
}
