import { BaseModel } from '@modules/common/models/base.model';
import { User } from '@modules/users/models/user.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RefreshToken extends BaseModel {
  @Field()
  revoked: boolean;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Date)
  expiresAt: Date;
}
