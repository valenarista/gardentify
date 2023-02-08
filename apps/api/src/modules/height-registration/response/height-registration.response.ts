import { Field, ObjectType } from '@nestjs/graphql';

import { Error } from '@modules/common/models/error.model';
import { HeightRegistration } from '../models/height-registration.model';

@ObjectType()
export class HeightRegistrationResponse {
  @Field(() => HeightRegistration, { nullable: true })
  heightRegistration?: HeightRegistration;

  @Field(() => [Error], { nullable: true })
  errors?: Error[];
}
