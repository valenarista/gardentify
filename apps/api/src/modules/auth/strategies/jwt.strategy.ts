import { IConfig } from '@modules/config/config.module';
import { User } from '@modules/users/models/user.model';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Request } from 'express';

type AccessTokenPayload = {
  sub: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService<IConfig>,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: JwtStrategy.extractJWT,
      secretOrKey: configService.get('jwt', { infer: true }).secret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: AccessTokenPayload): Promise<User> {
    const user = await this.authService.validateUser(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && 'auth' in req.cookies) {
      return req.cookies.auth.accessToken;
    }
    return null;
  }
}
