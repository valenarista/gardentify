import { BaseModel } from '@modules/common/models/base.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@ObjectType()
export class User extends BaseModel {
  @Field(() => String)
  username: string;

  @Field(() => String)
  @IsEmail()
  email: string;
}
