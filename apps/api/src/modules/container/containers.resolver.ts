import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateContainerInput } from './dto/create-container.input';
import { FindContainerInput } from './dto/find-container.input';
import { Container } from './models/container.model';
import { ContainerResponse } from './responses/container.response';
import { ContainersResponse } from './responses/containers.response';
import { DeleteObjectResponse } from '@modules/common/responses/delete-object.response';
import { AddPlantToContainerInput } from './dto/add-plant-to-container.input';
import { RemovePlantFromContainerInput } from './dto/remove-plant-from-container.input';
import { ContainersService } from './containers.service';
import { FindUserContainersInput } from './dto/find-user-containers.input';
import { UseGuards } from '@nestjs/common';
import { UpdateContainerInput } from './dto/update-container.input';
import { PlantsResponse } from '@modules/plants/responses/plants.response';
import { GqlAuthGuard } from '@modules/auth/guards/gql-auth.guard';
import { ContainerStatsResponse } from './responses/container-stats.response';
import { ContainerHarvestsResponse } from './responses/container-harvests.response';
import { FindContainerPlantsInput } from './dto/find-container-plants.input';
import { FindBestPerformingContainersInput } from './dto/find-best-performing-containers.input';
import { BestPerformingContainersResponse } from './responses/best-performing-containers.response';

@Resolver(() => Container)
export class ContainersResolver {
  constructor(private containersService: ContainersService) {}

  @Query(() => ContainerResponse)
  async findContainer(
    @Args('input') input: FindContainerInput,
  ): Promise<ContainerResponse> {
    return await this.containersService.findContainer(input);
  }

  @Query(() => ContainersResponse)
  async findContainers(
    @Args('input') input: FindContainerInput,
  ): Promise<ContainersResponse> {
    return await this.containersService.findContainers(input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ContainerResponse)
  async createContainer(
    @Args('input') input: CreateContainerInput,
  ): Promise<ContainerResponse> {
    return await this.containersService.createContainer(input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => DeleteObjectResponse)
  async deleteContainer(
    @Args('input') input: FindContainerInput,
  ): Promise<DeleteObjectResponse> {
    return await this.containersService.deleteContainer(input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ContainerResponse)
  async addPlantToContainer(
    @Args('input') input: AddPlantToContainerInput,
  ): Promise<ContainerResponse> {
    return await this.containersService.addPlantToContainer(input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => DeleteObjectResponse)
  async removePlantFromContainer(
    @Args('input') input: RemovePlantFromContainerInput,
  ): Promise<DeleteObjectResponse> {
    return await this.containersService.removePlantFromContainer(input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ContainerResponse)
  async updateContainer(
    @Args('input') input: UpdateContainerInput,
  ): Promise<ContainerResponse> {
    return await this.containersService.updateContainer(input);
  }

  @Query(() => PlantsResponse)
  async findContainerPlants(
    @Args('input') input: FindContainerPlantsInput,
  ): Promise<PlantsResponse> {
    return await this.containersService.findContainerPlants(input);
  }

  @Query(() => ContainersResponse)
  async findUserContainers(
    @Args('input') input: FindUserContainersInput,
  ): Promise<ContainersResponse> {
    return await this.containersService.findUserContainers(input);
  }

  @Query(() => ContainerStatsResponse)
  async calculateContainerStats(
    @Args('input') input: FindContainerInput,
  ): Promise<ContainerStatsResponse> {
    return await this.containersService.calculateContainerStats(input);
  }

  @Query(() => ContainerHarvestsResponse)
  async findContainerHarvests(
    @Args('input') input: FindContainerInput,
  ): Promise<ContainerHarvestsResponse> {
    return await this.containersService.findContainerHarvests(input);
  }

  @Query(() => BestPerformingContainersResponse)
  async findBestPerformingContainers(
    @Args('input') input: FindBestPerformingContainersInput,
  ): Promise<BestPerformingContainersResponse> {
    return await this.containersService.findBestPerformingContainers(input);
  }
}
