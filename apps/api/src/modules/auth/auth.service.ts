import { IConfig } from '@modules/config/config.module';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { SignupInput } from './dto/signup.input';
import { Token } from './models/token.model';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService<IConfig>,
  ) {}

  async createUser(payload: SignupInput): Promise<Token> {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password,
    );

    try {
      const user = await this.prisma.user.create({
        data: {
          ...payload,
          password: hashedPassword,
        },
      });

      return this.generateTokens({
        userUuid: user.uuid,
      });
    } catch (e) {
      console.log({ e });
    }
  }

  async login(username: string, password: string): Promise<Token> {
    const user = await this.prisma.user.findUnique({ where: { username } });

    if (!user) {
      throw new NotFoundException(`No user found for username: ${username}`);
    }

    const passwordValid = await this.passwordService.validatePassword(
      password,
      user.password,
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    return this.generateTokens({
      userUuid: user.uuid,
    });
  }

  async validateUser(userUuid: string): Promise<User> {
    console.log({ userUuid });

    return this.prisma.user.findUnique({ where: { uuid: userUuid } });
  }

  getUserFromToken(token: string): Promise<User> {
    const uuid = this.jwtService.decode(token)['userUuid'];
    return this.prisma.user.findUnique({ where: { uuid } });
  }

  generateTokens(payload: { userUuid: string }): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: { userUuid: string }): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: { userUuid: string }): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('jwt', { infer: true }).secret,
      expiresIn: this.configService.get('jwt', { infer: true }).refreshExpiry,
    });
  }

  refreshToken(token: string) {
    try {
      const { userUuid } = this.jwtService.verify(token, {
        secret: this.configService.get('jwt', { infer: true }).secret,
      });

      return this.generateTokens({
        userUuid,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
