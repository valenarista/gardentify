import {
  Resolver,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './models/auth.model';
import { Token } from './models/token.model';
import { LoginInput } from './dto/login.input';
import { SignUpInput } from './dto/signup.input';
import { RefreshTokenInput } from './dto/refresh-token.input';
import { User } from '@modules/users/models/user.model';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation(() => Auth)
  async signup(@Args('input') input: SignUpInput) {
    const { accessToken, refreshToken } = await this.auth.createUser(input);
    return {
      accessToken,
      refreshToken,
    };
  }

  @Mutation(() => Auth)
  async login(@Args('input') { username, password }: LoginInput) {
    const { accessToken, refreshToken } = await this.auth.login(
      username,
      password,
    );

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
