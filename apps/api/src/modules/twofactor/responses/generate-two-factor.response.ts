import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GenerateTwoFactorResponse {
  @Field(() => String)
  otpUrl: string;

  @Field(() => String)
  twoFactorSecret: string;
}
