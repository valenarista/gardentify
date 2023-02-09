import { User } from '@modules/users/models/user.model';
import { ObjectType } from '@nestjs/graphql';
import { Token } from './token.model';

@ObjectType()
export class Auth extends Token {
  user: User;
}
