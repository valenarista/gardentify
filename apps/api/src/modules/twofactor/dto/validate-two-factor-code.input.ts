import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ValidateTwoFactorCodeInput {
  @Field()
  twoFactorCode: string;

  @Field()
  userSecret: string;
}
