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
import { RequestResetPasswordInput } from './dto/request-reset-password.input';
import { ResetPasswordInput } from './dto/reset-password.input';
import { RequestResetPasswordResponse } from './responses/request-reset-password.response';
import { ResetPasswordResponse } from './responses/reset-password.response';
import { SetupTwoFactorCodeInput } from './dto/setup-two-factor-code.input';
import { SetupTwoFactorCodeResponse } from './responses/setup-two-factor-code.response';

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
  async login(@Args('input') input: LoginInput) {
    const { accessToken, refreshToken } = await this.auth.login(input);

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

  @Mutation(() => SetupTwoFactorCodeResponse)
  async setupTwoFactorCode(
    @Args('input') input: SetupTwoFactorCodeInput,
  ): Promise<SetupTwoFactorCodeResponse> {
    return await this.auth.setupTwoFactorCode(input);
  }

  @Mutation(() => RequestResetPasswordResponse)
  async requestResetPassword(
    @Args('input') input: RequestResetPasswordInput,
  ): Promise<RequestResetPasswordResponse> {
    return await this.auth.requestResetPassword(input);
  }

  @Mutation(() => ResetPasswordResponse)
  async resetPassword(
    @Args('input') input: ResetPasswordInput,
  ): Promise<ResetPasswordResponse> {
    return await this.auth.resetPassword(input);
  }
}
