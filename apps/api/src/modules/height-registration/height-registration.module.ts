import { PrismaService } from '@modules/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { HeightRegistrationsResolver } from './height-registration.resolver';
import { HeightRegistrationsService } from './height-registration.service';

@Module({
  imports: [],
  providers: [
    PrismaService,
    HeightRegistrationsResolver,
    HeightRegistrationsService,
  ],
})
export class HeightRegistrationsModule {}
