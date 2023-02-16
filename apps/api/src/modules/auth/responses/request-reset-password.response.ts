import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RequestResetPasswordResponse {
  @Field(() => Boolean)
  emailSent: boolean;
}
