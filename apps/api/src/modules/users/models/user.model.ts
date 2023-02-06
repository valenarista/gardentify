import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class User {
  @Field(() => String, { nullable: true })
  username?: string;
}
