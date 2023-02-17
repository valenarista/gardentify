import { BaseModel } from '@modules/common/models/base.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User extends BaseModel {
  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => Boolean)
  twoFactorEnabled: boolean;
}
