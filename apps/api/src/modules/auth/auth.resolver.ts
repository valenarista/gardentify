import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './models/auth.model';
import { LoginInput } from './dto/login.input';
import { SignUpInput } from './dto/signup.input';
import { RequestResetPasswordInput } from './dto/request-reset-password.input';
import { ResetPasswordInput } from './dto/reset-password.input';
import { RequestResetPasswordResponse } from './responses/request-reset-password.response';
import { ResetPasswordResponse } from './responses/reset-password.response';
import { SetupTwoFactorCodeInput } from './dto/setup-two-factor-code.input';
import { SetupTwoFactorCodeResponse } from './responses/setup-two-factor-code.response';
import { UseInterceptors } from '@nestjs/common';
import { SetAuthCookieInterceptor } from './interceptors/set-auth-cookie.interceptor';
import { AuthResponse } from './responses/auth.response';
import { RemoveAuthCookieInterceptor } from './interceptors/remove-auth-cookie.interceptor';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  @UseInterceptors(SetAuthCookieInterceptor)
  async signUp(@Args('input') input: SignUpInput): Promise<AuthResponse> {
    return await this.authService.signUp(input);
  }

  @Mutation(() => AuthResponse)
  @UseInterceptors(SetAuthCookieInterceptor)
  async login(@Args('input') input: LoginInput): Promise<AuthResponse> {
    return await this.authService.login(input);
  }

  @Mutation(() => Boolean)
  @UseInterceptors(RemoveAuthCookieInterceptor)
  async logOut() {
    return true;
  }

  @Mutation(() => SetupTwoFactorCodeResponse)
  async setupTwoFactorCode(
    @Args('input') input: SetupTwoFactorCodeInput,
  ): Promise<SetupTwoFactorCodeResponse> {
    return await this.authService.setupTwoFactorCode(input);
  }

  @Mutation(() => RequestResetPasswordResponse)
  async requestResetPassword(
    @Args('input') input: RequestResetPasswordInput,
  ): Promise<RequestResetPasswordResponse> {
    return await this.authService.requestResetPassword(input);
  }

  @Mutation(() => ResetPasswordResponse)
  async resetPassword(
    @Args('input') input: ResetPasswordInput,
  ): Promise<ResetPasswordResponse> {
    return await this.authService.resetPassword(input);
  }

  @Query(() => Boolean)
  async authCheck() {
    return true;
  }
}
