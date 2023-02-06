import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../models/user.model';

@ObjectType()
export class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;
}
