import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsJWT, IsNotEmpty } from 'class-validator';
import { GraphQLJWT } from 'graphql-scalars';

@InputType()
export class RefreshTokenInput {
  @IsNotEmpty()
  @Field(() => String)
  token: string;
}
