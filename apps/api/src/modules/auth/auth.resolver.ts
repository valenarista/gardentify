import {
  Resolver,
  Mutation,
  Args,
  Parent,
  ResolveField,
  Context,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './models/auth.model';
import { Token } from './models/token.model';
import { LoginInput } from './dto/login.input';
import { SignupInput } from './dto/signup.input';
import { RefreshTokenInput } from './dto/refresh-token.input';
import { User } from '@modules/users/models/user.model';
import { GardentifyContext } from '@modules/graphql/graphql';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation(() => Auth)
  async signup(@Args('data') data: SignupInput) {
    const { accessToken, refreshToken } = await this.auth.createUser(data);
    return {
      accessToken,
      refreshToken,
    };
  }

  @Mutation(() => Auth)
  async login(
    @Args('data') { username, password }: LoginInput,
    @Context() context: GardentifyContext,
  ) {
    const { accessToken, refreshToken } = await this.auth.login(
      username,
      password,
    );

    // context.res.cookie('accessToken', accessToken, { httpOnly: true });
    // context.res.cookie('refreshToken', refreshToken, { httpOnly: true });

    return {
      accessToken,
      refreshToken,
    };
  }

  @Mutation(() => Token)
  async refreshToken(@Args('input') input: RefreshTokenInput) {
    return this.auth.refreshToken(input.token);
  }

  @ResolveField('user', () => User)
  async user(@Parent() auth: Auth) {
    return await this.auth.getUserFromToken(auth.accessToken);
  }
}
