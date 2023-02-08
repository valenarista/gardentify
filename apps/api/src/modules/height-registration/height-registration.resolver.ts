import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'nestjs-prisma';

import { HeightRegistration } from './models/height-registration.model';
import { HeightRegistrationResponse } from './response/height-registration.response';
import { FindHeightRegistrationInput } from './dto/find-height-registrations.input';
import { CreateHeightRegistrationInput } from './dto/create-height-registration.input';
import { FindPlantInput } from '@modules/plants/dto/find-plant.input';
import { HeightRegistrationsResponse } from './response/height-registrations.response';
import { DeleteObjectResponse } from '@modules/common/responses/delete-object.response';

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

  @Mutation(() => HeightRegistrationResponse)
  async createHeightRegistration(
    @Args('input') input: CreateHeightRegistrationInput,
  ): Promise<HeightRegistrationResponse> {
    try {
      const heightRegistration =
        await this.prismaService.heightRegistration.create({
          data: {
            height: input.height,
            plant: { connect: { uuid: input.plantUuid } },
          },
        });

      if (!heightRegistration) {
        return {
          errors: [
            {
              field: 'input',
              message:
                'Could not create height registration with the given input!',
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

  @Query(() => HeightRegistrationsResponse)
  async findPlantHeightRegistrations(
    @Args('find') find: FindPlantInput,
  ): Promise<HeightRegistrationsResponse> {
    try {
      const heightRegistrations =
        await this.prismaService.heightRegistration.findMany({
          where: { plantUuid: find.uuid },
        });

      if (!heightRegistrations) {
        return {
          errors: [
            {
              field: 'input',
              message:
                'Could not find height registrations with the given input!',
            },
          ],
        };
      }
      return { heightRegistrations };
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

  @Mutation(() => DeleteObjectResponse)
  async deleteHeightRegistration(
    @Args('find') find: FindHeightRegistrationInput,
  ): Promise<DeleteObjectResponse> {
    try {
      await this.prismaService.heightRegistration.delete({
        where: { uuid: find.uuid },
      });
      return { deleted: true };
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
