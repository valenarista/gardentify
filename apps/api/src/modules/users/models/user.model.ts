import { BaseModel } from '@modules/common/models/base.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User extends BaseModel {
  @Field(() => String)
  username: string;

  @Field(() => String, { nullable: true })
  oauthId?: string;

  @Field(() => String, { nullable: true })
  avatar?: string;
}
