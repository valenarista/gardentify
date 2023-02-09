import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@ObjectType({ isAbstract: true })
export class User {
  @Field(() => String, { nullable: true })
  @IsEmail()
  email?: string;
}
