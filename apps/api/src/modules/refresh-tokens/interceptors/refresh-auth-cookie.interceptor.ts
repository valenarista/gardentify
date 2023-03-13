import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { map, Observable } from 'rxjs';
import { AuthTokens } from '@modules/auth/models/token.model';

@Injectable()
export class RefreshAuthCookieInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((authTokens: AuthTokens) => {
        const ctx = GqlExecutionContext.create(context).getContext();
        ctx.req.res.cookie('auth', authTokens, {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        });
        return true;
      }),
    );
  }
}
