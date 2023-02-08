import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'nestjs-prisma';

import { HeightRegistration } from './models/height-registration.model';
import { HeightRegistrationResponse } from './response/height-registration.response';
import { FindHeightRegistrationInput } from './dto/find-height-registrations.input';

@Resolver(() => HeightRegistration)
export class HeightRegistrationsResolver {
  constructor(private prismaService: PrismaService) {}

  @Query(() => HeightRegistrationResponse)
  async findHeightRegistration(
    @Args('find') find: FindHeightRegistrationInput,
  ): Promise<HeightRegistrationResponse> {
    try {
      const heightRegistration =
        await this.prismaService.heightRegistration.findUnique({
          where: {
            uuid: find.uuid,
          },
        });

      if (!heightRegistration) {
        return {
          errors: [
            {
              field: 'input',
              message: 'No  height registration found with the given input!',
            },
          ],
        };
      }

      return { heightRegistration };
    } catch (err) {
      return {
        errors: [
          {
            field: 'input',
            message: 'An error ocurred!',
          },
        ],
      };
    }
  }
}
