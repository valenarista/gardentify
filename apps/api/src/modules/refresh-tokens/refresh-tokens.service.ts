import { AuthService } from '@modules/auth/auth.service';
import { AuthTokens } from '@modules/auth/models/token.model';
import { IConfig } from '@modules/config/config.module';
import { PrismaService } from '@modules/prisma/prisma.service';
import { UsersService } from '@modules/users/users.service';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenExpiredError } from 'jsonwebtoken';
import { RefreshToken } from './models/refresh-token.model';

@Injectable()
export class RefreshTokensService {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly configService: ConfigService<IConfig>,
  ) {}

  async sendRefreshToken(userUuid: string): Promise<AuthTokens> {
    const accessToken = await this.authService.generateAccessToken({
      sub: userUuid,
    });

    const { refreshToken, uuid } = await this.generateRefreshToken(userUuid);
    await this.revokeOtherUserRefreshTokens(uuid, userUuid);

    return { accessToken, refreshToken };
  }

  async validateRefreshToken(uuid: string, userUuid: string) {
    try {
      const refreshToken = await this.prismaService.refreshToken.findUnique({
        where: { uuid },
      });

      if (!refreshToken)
        throw new BadRequestException('No refresh token found');

      if (refreshToken.revoked) {
        await this.revokeUserRefreshTokens(userUuid);
        console.log('Refresh token revoked');
        return;
      }

      const user = await this.usersService.findUser({ uuid: userUuid });
      if (!user) {
        throw new BadRequestException('An error ocurred');
      }

      return true;
    } catch (err: any) {
      if (err instanceof TokenExpiredError) {
        return 'Refresh token expired';
      } else {
        return err.message as string;
      }
    }
  }

  async generateRefreshToken(userUuid: string) {
    const { uuid } = await this.createRefreshToken(userUuid);
    const payload = { jti: uuid, sub: userUuid };

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('jwt', { infer: true }).secret,
      expiresIn: this.configService.get('jwt', { infer: true }).refreshExpiry,
    });

    return { refreshToken, uuid };
  }

  async createRefreshToken(userUuid: string): Promise<RefreshToken> {
    const expiresAt = new Date();
    expiresAt.setTime(
      expiresAt.getTime() +
        this.configService.get('jwt', { infer: true }).refreshExpiry,
    );
    const refreshToken = await this.prismaService.refreshToken.create({
      data: {
        userUuid,
        expiresAt,
      },
    });

    if (!refreshToken)
      throw new BadRequestException(
        'An error ocurred while generating refresh token',
      );

    return refreshToken;
  }

  async revokeUserRefreshTokens(userUuid: string) {
    await this.prismaService.refreshToken.updateMany({
      where: { userUuid },
      data: { revoked: true },
    });
  }

  async revokeOtherUserRefreshTokens(refreshedUuid: string, userUuid: string) {
    await this.prismaService.refreshToken.updateMany({
      where: { uuid: { not: refreshedUuid }, userUuid },
      data: { revoked: true },
    });
  }
}
