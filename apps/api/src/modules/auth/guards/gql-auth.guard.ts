import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GardentifyContext } from '@modules/graphql/graphql';

@Injectable()
export class GraphqlAuthGuard extends AuthGuard('discord') {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext<GardentifyContext>();
    req.body = ctx.getArgs().user;
    console.log({ req });

    return req;
  }
}
