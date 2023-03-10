import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { map, Observable } from 'rxjs';
import { AuthResponse } from '../responses/auth.response';

@Injectable()
export class SetAuthCookieInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map(({ authTokens, ...userData }: AuthResponse) => {
        const ctx = GqlExecutionContext.create(context).getContext();
        ctx.req.res.cookie('auth', authTokens, {
          httpOnly: true,
          sameSite: true,
          secure: true,
        });
        return userData;
      }),
    );
  }
}
