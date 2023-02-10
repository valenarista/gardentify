import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../models/user.model';
import { Error } from '@modules/common/models/error.model';

@ObjectType()
export class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [Error], { nullable: true })
  errors?: Error[];
}
