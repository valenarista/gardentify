import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'nestjs-prisma';

import { DeleteObjectResponse } from '@modules/common/responses/delete-object.response';
import { Plant } from './models/plant.model';
import { PlantResponse } from './responses/plant.response';
import { FindPlantInput } from './dto/find-plant.input';
import { parsePlantType } from './lib/plant-utils';
import { PlantsResponse } from './responses/plants.response';
import { CreatePlantInput } from './dto/create-plant.input';
import { parseContainerType } from '@modules/container/lib/container-utils';
import { UpdatePlantInput } from './dto/update-plant.input';
import { UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '@modules/auth/guards/gql-auth.guard';
@Resolver(() => Plant)
@UseGuards(GqlAuthGuard)
export class PlantsResolver {
  constructor(private prismaService: PrismaService) {}

  @Query(() => PlantResponse)
  async findPlant(@Args('find') find: FindPlantInput): Promise<PlantResponse> {
    try {
      const plant = await this.prismaService.plant.findUnique({
        where: {
          uuid: find.uuid,
        },
      });

      if (!plant) {
        return {
          errors: [
            {
              field: 'input',
              message: 'No plant found with the given input!',
            },
          ],
        };
      }

      const parsedPlant: Plant = {
        ...plant,
        type: parsePlantType(plant.type),
      };

      return { plant: parsedPlant };
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

  @Query(() => PlantsResponse)
  async findPlants(
    @Args('find') find: FindPlantInput,
  ): Promise<PlantsResponse> {
    try {
      const plants = await this.prismaService.plant.findMany({
        where: { uuid: find.uuid },
      });

      if (!plants.length) {
        return {
          errors: [
            {
              field: 'input',
              message: 'No plants found with the given input!',
            },
          ],
        };
      }

      const parsedPlants: Plant[] = plants.map((plant) => {
        return {
          ...plant,
          type: parsePlantType(plant.type),
        };
      });

      return { plants: parsedPlants };
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

  @Mutation(() => PlantResponse)
  async createPlant(
    @Args('data') data: CreatePlantInput,
  ): Promise<PlantResponse> {
    try {
      const plant = await this.prismaService.plant.create({
        data: {
          variety: data.variety,
          type: parsePlantType(data.type),
          plantedSeedsOn: data.plantedSeedsOn,
          seedsSproutedOn: data.seedsSproutedOn,
          container: { connect: { uuid: data.container.uuid } },
        },
        include: { container: true },
      });

      if (!plant) {
        return {
          errors: [
            {
              field: 'input',
              message: 'Could not create plant with the given input!',
            },
          ],
        };
      }

      const parsedPlant: Plant = {
        ...plant,
        type: parsePlantType(plant.type),
        container: {
          ...plant.container,
          type: parseContainerType(plant.container.type),
        },
      };

      return { plant: parsedPlant };
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
  async deletePlant(
    @Args('find') find: FindPlantInput,
  ): Promise<DeleteObjectResponse> {
    try {
      await this.prismaService.plant.delete({
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

  @Mutation(() => PlantResponse)
  async updatePlant(
    @Args('find') find: FindPlantInput,
    @Args('data') data: UpdatePlantInput,
  ): Promise<PlantResponse> {
    try {
      const updatedPlant = await this.prismaService.plant.update({
        where: { uuid: find.uuid },
        data: {
          ...data,
        },
        include: { container: true },
      });

      if (!updatedPlant) {
        return {
          errors: [
            {
              field: 'input',
              message: 'Could not update plant with the given input!',
            },
          ],
        };
      }

      const parsedPlant: Plant = {
        ...updatedPlant,
        type: parsePlantType(updatedPlant.type),
        container: {
          ...updatedPlant.container,
          type: parseContainerType(updatedPlant.container.type),
        },
      };

      return {
        plant: parsedPlant,
      };
    } catch (err) {
      console.log(err);

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
