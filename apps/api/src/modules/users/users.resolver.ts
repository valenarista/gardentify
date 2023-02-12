import { GardentifyContext } from '@modules/graphql/graphql';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { FindUserInput } from './dto/find-user.input';
import { User } from './models/user.model';
import { UserResponse } from './responses/user.response';
import { UsersService } from './users.service';

@Resolver(() => User)
// @UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => UserResponse)
  async me(@Context() context: GardentifyContext): Promise<UserResponse> {
    return await this.usersService.me(context);
  }

  @Query(() => UserResponse)
  async findUser(@Args('input') input: FindUserInput): Promise<UserResponse> {
    return await this.usersService.findUser(input);
  }
}
