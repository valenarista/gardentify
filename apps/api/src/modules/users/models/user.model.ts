import { BaseModel } from '@modules/common/models/base.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@ObjectType()
export class User extends BaseModel {
  @Field(() => String, { nullable: true })
  @IsEmail()
  email?: string;
}
