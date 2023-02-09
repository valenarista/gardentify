import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJWT } from 'graphql-scalars';

@ObjectType()
export class Token {
  @Field(() => String, { description: 'JWT access token' })
  accessToken: string;

  @Field(() => String, { description: 'JWT refresh token' })
  refreshToken: string;
}
