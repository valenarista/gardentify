import { getSub } from '@modules/auth/auth.utils';
import { GardentifyContext } from '@modules/graphql/graphql';
import { User } from '@modules/users/models/user.model';
import { AuthenticationError } from '@nestjs/apollo';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const RefreshTokenUser = createParamDecorator<
  unknown,
  ExecutionContext,
  Promise<User>
>(async (_, context) => {
  const executionContext = GqlExecutionContext.create(context);
  const {
    authTokens: { refreshToken },
    usersService,
  }: GardentifyContext = executionContext.getContext();

  const sub = getSub(refreshToken);
  if (!sub) {
    throw new AuthenticationError('Refresh token malformed');
  }

  const user = await usersService.findUser({ uuid: sub });
  if (!user) {
    throw new AuthenticationError('User not found');
  }

  return user.user;
});
