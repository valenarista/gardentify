import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Error {
  @Field(() => String)
  field: string;

  @Field(() => String)
  message: string;
}
