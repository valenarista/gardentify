import { User } from '@modules/users/models/user.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { AuthTokens } from '../models/token.model';

@ObjectType()
export class AuthResponse {
  @Field(() => User)
  user: User;

  @Field(() => AuthTokens, { nullable: true })
  authTokens?: AuthTokens;
}
