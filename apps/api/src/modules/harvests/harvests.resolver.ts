import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { DeleteObjectResponse } from '@modules/common/responses/delete-object.response';

import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@modules/auth/guards/gql-auth.guard';
import { CreateHarvestInput } from './dto/create-harvest.input';
import { FindHarvestInput } from './dto/find-harvest.input';
import { UpdateHarvestInput } from './dto/update-harvest.input';
import { Harvest } from './models/harvests.model';
import { HarvestResponse } from './responses/harvest.response';
import { HarvestsResponse } from './responses/harvests.response';
import { HarvestsService } from './harvests.service';
import { FindHarvestsInput } from './dto/find-harvests.input';
import { FindPlantHarvestsInput } from './dto/find-plant-harvests.input';
import { FindWeekHarvestsInput } from './dto/find-week-harvests.input';
import { FindLatestsHarvestsInput } from './dto/find-latests-harvests.input';

@Resolver(() => Harvest)
export class HarvestsResolver {
  constructor(private harvestsService: HarvestsService) {}

  @Query(() => HarvestResponse)
  async findHarvest(
    @Args('input') input: FindHarvestInput,
  ): Promise<HarvestResponse> {
    return await this.harvestsService.findHarvest(input);
  }

  @Query(() => HarvestsResponse)
  async findHarvests(
    @Args('input') input: FindHarvestsInput,
  ): Promise<HarvestsResponse> {
    return await this.harvestsService.findHarvests(input);
  }

  @Query(() => HarvestsResponse)
  async findPlantHarvests(
    @Args('input') input: FindPlantHarvestsInput,
  ): Promise<HarvestsResponse> {
    return await this.harvestsService.findPlantHarvests(input);
  }

  @Mutation(() => HarvestResponse)
  @UseGuards(GqlAuthGuard)
  async createHarvest(
    @Args('input') input: CreateHarvestInput,
  ): Promise<HarvestResponse> {
    return await this.harvestsService.createHarvest(input);
  }

  @Mutation(() => DeleteObjectResponse)
  @UseGuards(GqlAuthGuard)
  async deleteHarvest(
    @Args('input') input: FindHarvestInput,
  ): Promise<DeleteObjectResponse> {
    return await this.harvestsService.deleteHarvest(input);
  }

  @Mutation(() => HarvestResponse)
  @UseGuards(GqlAuthGuard)
  async updateHarvest(
    @Args('input') input: UpdateHarvestInput,
  ): Promise<HarvestResponse> {
    return await this.harvestsService.updateHarvest(input);
  }

  @Query(() => HarvestsResponse)
  @UseGuards(GqlAuthGuard)
  async findLatestsHarvests(
    @Args('input') input: FindLatestsHarvestsInput,
  ): Promise<HarvestsResponse> {
    return await this.harvestsService.findLatestsHarvests(input);
  }

  @Query(() => HarvestsResponse)
  @UseGuards(GqlAuthGuard)
  async findWeekHarvests(
    @Args('input') input: FindWeekHarvestsInput,
  ): Promise<HarvestsResponse> {
    return await this.harvestsService.findWeekHarvests(input);
  }
}
