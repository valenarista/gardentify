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
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlantsService {
  constructor(private prismaService: PrismaService) {}

  async findPlant(input: FindPlantInput): Promise<PlantResponse> {
    try {
      const plant = await this.prismaService.plant.findUnique({
        where: {
          uuid: input.uuid,
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

  async findPlants(input: FindPlantInput): Promise<PlantsResponse> {
    try {
      const plants = await this.prismaService.plant.findMany({
        where: { uuid: input.uuid },
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

  async createPlant(input: CreatePlantInput): Promise<PlantResponse> {
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

  async deletePlant(input: FindPlantInput): Promise<DeleteObjectResponse> {
    try {
      await this.prismaService.plant.delete({
        where: { uuid: input.uuid },
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

  async updatePlant(input: UpdatePlantInput): Promise<PlantResponse> {
    try {
      const updatedPlant = await this.prismaService.plant.update({
        where: { uuid: input.find.uuid },
        data: {
          ...input.data,
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
