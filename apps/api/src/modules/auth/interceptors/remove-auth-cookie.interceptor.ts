import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { Observable, tap } from 'rxjs';

@Injectable()
export class RemoveAuthCookieInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      tap(() => {
        const ctx = GqlExecutionContext.create(context).getContext();
        ctx.req.res.clearCookie('auth');
      }),
    );
  }
}
