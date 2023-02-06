import { Error } from '@modules/common/models/error.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteObjectResponse {
  @Field(() => Boolean, { nullable: true })
  deleted?: boolean;

  @Field(() => [Error], { nullable: true })
  errors?: Error[];
}
