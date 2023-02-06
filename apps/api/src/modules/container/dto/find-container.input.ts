import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindContainerInput {
  @Field(() => String, { nullable: true })
  uuid?: string;
}
