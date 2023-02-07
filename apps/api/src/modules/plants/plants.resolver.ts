import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'nestjs-prisma';

import {
  Container,
  ContainerType as PrismaContainerType,
} from '@prisma/client';
import { DeleteObjectResponse } from '@modules/common/responses/delete-object.response';
import { Plant } from './models/plant.model';
import { PlantResponse } from './responses/plant.response';
import { FindPlantInput } from './dto/find-plant.input';
import { parsePlantType } from './lib/plant-utils';
import { PlantsResponse } from './responses/plants.response';
import { CreatePlantInput } from './dto/create-plant.input';
import { parseContainerType } from '@modules/container/lib/container-utils';

@Resolver(() => Plant)
export class PlantsResolver {
  constructor(private prismaService: PrismaService) {}

  @Query(() => PlantResponse)
  async findPlant(
    @Args('input') input: FindPlantInput,
  ): Promise<PlantResponse> {
    try {
      const plant = await this.prismaService.plant.findUnique({
        where: {
          ...input,
        },
      });

      if (!plant) {
        return {
          errors: [
            {
              field: 'input',
              message: 'Not plant found with the given input!',
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
    @Args('input') input: FindPlantInput,
  ): Promise<PlantsResponse> {
    try {
      const plants = await this.prismaService.plant.findMany({
        where: { ...input },
      });

      if (!plants.length) {
        return {
          errors: [
            {
              field: 'input',
              message: 'Not plants found with the given input!',
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
    @Args('input') input: CreatePlantInput,
  ): Promise<PlantResponse> {
    try {
      const plant = await this.prismaService.plant.create({
        data: {
          variety: input.variety,
          type: parsePlantType(input.type),
          plantedSeedsOn: input.plantedSeedsOn,
          seedsSproutedOn: input.seedsSproutedOn,
          container: { connect: { uuid: input.container.uuid } },
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
    @Args('input') input: FindPlantInput,
  ): Promise<DeleteObjectResponse> {
    try {
      await this.prismaService.plant.delete({
        where: { ...input },
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
