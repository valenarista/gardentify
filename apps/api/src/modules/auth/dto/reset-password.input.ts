import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class ResetPasswordInput {
  @Field()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @Field(() => String)
  token: string;

  @IsNotEmpty()
  @Field(() => String)
  twoFactorCode: string;
}
