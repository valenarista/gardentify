import { Module } from '@nestjs/common';
import { HeightRegistrationsResolver } from './height-registration.resolver';
import { HeightRegistrationsService } from './height-registration.service';

@Module({
  imports: [],
  providers: [HeightRegistrationsResolver, HeightRegistrationsService],
})
export class HeightRegistrationsModule {}
