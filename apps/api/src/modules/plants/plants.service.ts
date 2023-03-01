import { DeleteObjectResponse } from '@modules/common/responses/delete-object.response';
import { Plant } from './models/plant.model';
import { PlantResponse } from './responses/plant.response';
import { FindPlantInput } from './dto/find-plant.input';
import { parsePlantType } from './lib/plant-utils';
import { PlantsResponse } from './responses/plants.response';
import { CreatePlantInput } from './dto/create-plant.input';
import { parseContainerType } from '@modules/container/lib/container-utils';
import { UpdatePlantInput } from './dto/update-plant.input';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@modules/prisma/prisma.service';

@Injectable()
export class PlantsService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async findPlant(input: FindPlantInput): Promise<PlantResponse> {
    try {
      const plant = await this.prismaService.plant.findUnique({
        where: {
          uuid: input.uuid,
        },
        include: { container: { include: { user: true } } },
      });

      if (!plant) {
        throw new NotFoundException('No plant found with the given input!');
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
      throw new BadRequestException('An eror ocurred!');
    }
  }

  async findPlants(input: FindPlantInput): Promise<PlantsResponse> {
    try {
      const plants = await this.prismaService.plant.findMany({
        where: { uuid: input.uuid },
      });

      if (!plants.length) {
        throw new NotFoundException('No plants found with the given input!');
      }

      const parsedPlants: Plant[] = plants.map((plant) => {
        return {
          ...plant,
          type: parsePlantType(plant.type),
        };
      });

      return { plants: parsedPlants };
    } catch (err) {
      throw new BadRequestException('An eror ocurred!');
    }
  }

  async createPlant(input: CreatePlantInput): Promise<PlantResponse> {
    try {
      const plant = await this.prismaService.plant.create({
        data: {
          variety: input.variety,
          type: parsePlantType(input.type),
          seedsPlantedAt: input.seedsPlantedAt,
          seedsSproutedAt: input.seedsSproutedAt,
          container: { connect: { uuid: input.container.uuid } },
        },
        include: { container: true },
      });

      if (!plant) {
        throw new BadRequestException(
          'Could not create plant with the given input',
        );
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
      throw new BadRequestException('An eror ocurred!');
    }
  }

  async deletePlant(input: FindPlantInput): Promise<DeleteObjectResponse> {
    try {
      await this.prismaService.plant.delete({
        where: { uuid: input.uuid },
      });
      return { deleted: true };
    } catch (err) {
      throw new BadRequestException('An eror ocurred!');
    }
  }

  async updatePlant(input: UpdatePlantInput): Promise<PlantResponse> {
    try {
      const updatedPlant = await this.prismaService.plant.update({
        where: { uuid: input.uuid },
        data: {
          ...input,
        },
        include: { container: true },
      });

      if (!updatedPlant) {
        throw new NotFoundException('No plant found with the given input!');
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
      throw new BadRequestException('An eror ocurred!');
    }
  }
}
