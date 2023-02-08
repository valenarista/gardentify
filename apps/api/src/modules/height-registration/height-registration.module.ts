import { Module } from '@nestjs/common';
import { HeightRegistrationsResolver } from './height-registration.resolver';

@Module({
  imports: [],
  providers: [HeightRegistrationsResolver],
})
export class HeightRegistrationsModule {}
