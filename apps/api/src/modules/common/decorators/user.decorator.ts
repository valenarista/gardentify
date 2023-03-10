import { GardentifyContext } from '@modules/graphql/graphql';
import { User } from '@modules/users/models/user.model';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator<
  unknown,
  ExecutionContext,
  User
>((_, context) => {
  const executionContext = GqlExecutionContext.create(context);
  const ctx = executionContext.getContext<GardentifyContext>();
  return ctx.user;
});
