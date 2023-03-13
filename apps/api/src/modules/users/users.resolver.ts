import { GqlAuthGuard } from '@modules/auth/guards/gql-auth.guard';
import { CurrentUser } from '@modules/common/decorators/user.decorator';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FindUserInput } from './dto/find-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './models/user.model';
import { UserResponse } from './responses/user.response';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User)
  async me(@CurrentUser() user: User): Promise<User> {
    if (user === null) throw new UnauthorizedException('Unauthorized');
    const foundUser = await this.usersService.findUser({ uuid: user.uuid });
    return foundUser.user;
  }

  @Query(() => UserResponse)
  async findUser(@Args('input') input: FindUserInput): Promise<UserResponse> {
    return await this.usersService.findUser(input);
  }

  @Mutation(() => UserResponse)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @Args('input') input: UpdateUserInput,
  ): Promise<UserResponse> {
    return await this.usersService.updateUser(input);
  }
}
