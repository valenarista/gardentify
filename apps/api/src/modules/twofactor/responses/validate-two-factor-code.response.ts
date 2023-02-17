import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ValidateTwoFactorCodeResponse {
  @Field(() => Boolean)
  valid: boolean;
}
