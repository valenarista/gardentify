import { DeleteObjectResponse } from '@modules/common/responses/delete-object.response';
import { HarvestResponse } from './responses/harvest.response';
import { FindHarvestInput } from './dto/find-harvest.input';
import { HarvestsResponse } from './responses/harvests.response';
import { CreateHarvestInput } from './dto/create-harvest.input';
import { UpdateHarvestInput } from './dto/update-harvest.input';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/prisma.service';
import { Harvest } from './models/harvests.model';
import { parsePlantType } from '@modules/plants/lib/plant-utils';
import { FindPlantInput } from '@modules/plants/dto/find-plant.input';

@Injectable()
export class HarvestsService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async findHarvest(input: FindHarvestInput): Promise<HarvestResponse> {
    try {
      const harvest = await this.prismaService.harvest.findUnique({
        where: {
          uuid: input.uuid,
        },
        include: { plant: true },
      });

      if (!harvest) {
        throw new NotFoundException(
          'Could not find harvest with the given input!',
        );
      }

      const parsedHarvest: Harvest = {
        ...harvest,
        plant: {
          ...harvest.plant,
          type: parsePlantType(harvest.plant.type),
        },
      };

      return { harvest: parsedHarvest };
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

  async findHarvests(input: FindHarvestInput): Promise<HarvestsResponse> {
    try {
      const harvests = await this.prismaService.harvest.findMany({
        where: { uuid: input.uuid },
      });

      if (!harvests.length) {
        throw new NotFoundException(
          'Could not find harvests with the given input!',
        );
      }

      return { harvests };
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

  async findPlantHarvests(input: FindPlantInput): Promise<HarvestsResponse> {
    try {
      const harvests = await this.prismaService.harvest.findMany({
        where: { plant: { uuid: input.uuid } },
      });

      if (!harvests.length) {
        throw new NotFoundException(
          'Could not find harvests with the given input!',
        );
      }

      return { harvests };
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

  async createHarvest(input: CreateHarvestInput): Promise<HarvestResponse> {
    try {
      const harvest = await this.prismaService.harvest.create({
        data: {
          ...input,
          plant: { connect: { uuid: input.plant.uuid } },
        },
        include: { plant: true },
      });

      if (!harvest) {
        throw new NotFoundException(
          'Could not create harvest with the given input!',
        );
      }

      const parsedHarvest: Harvest = {
        ...harvest,
        plant: {
          ...harvest.plant,
          type: parsePlantType(harvest.plant.type),
        },
      };

      return { harvest: parsedHarvest };
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

  async deleteHarvest(input: FindHarvestInput): Promise<DeleteObjectResponse> {
    try {
      await this.prismaService.harvest.delete({
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

  async updateHarvest(input: UpdateHarvestInput): Promise<HarvestResponse> {
    try {
      const updatedHarvest = await this.prismaService.harvest.update({
        where: { uuid: input.uuid },
        data: {
          ...input,
        },
        include: { plant: true },
      });

      if (!updatedHarvest) {
        throw new NotFoundException(
          'Could not update harvest with the given input!',
        );
      }

      const parsedHarvest: Harvest = {
        ...updatedHarvest,
        plant: {
          ...updatedHarvest.plant,
          type: parsePlantType(updatedHarvest.plant.type),
        },
      };

      return { harvest: parsedHarvest };
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
