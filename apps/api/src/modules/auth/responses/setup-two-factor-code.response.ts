import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SetupTwoFactorCodeResponse {
  @Field(() => Boolean)
  emailSent: boolean;
}
