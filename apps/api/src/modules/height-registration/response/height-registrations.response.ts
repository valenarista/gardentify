import { Field, ObjectType } from '@nestjs/graphql';

import { Error } from '@modules/common/models/error.model';
import { HeightRegistration } from '../models/height-registration.model';

@ObjectType()
export class HeightRegistrationsResponse {
  @Field(() => [HeightRegistration], { nullable: true })
  heightRegistrations?: HeightRegistration[];

  @Field(() => [Error], { nullable: true })
  errors?: Error[];
}
