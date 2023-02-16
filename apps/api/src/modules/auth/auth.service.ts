import { IConfig } from '@modules/config/config.module';
import { Prisma } from '@prisma/client';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { SignUpInput } from './dto/signup.input';
import { Token } from './models/token.model';
import { PasswordService } from './password.service';
import { PrismaService } from '@modules/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(PrismaService)
    private readonly prismaService: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService<IConfig>,
  ) {}

  async createUser(input: SignUpInput): Promise<Token> {
    const hashedPassword = await this.passwordService.hashPassword(
      input.password,
    );

    try {
      const user = await this.prismaService.user.create({
        data: {
          ...input,
          password: hashedPassword,
        },
      });

      return this.generateTokens({
        userUuid: user.uuid,
      });
    } catch (e) {
      // Username already taken error.
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(
          `Username ${input.username} is already taken!`,
        );
      }
    }
  }

  async login(username: string, password: string): Promise<Token> {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });

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
    return this.prismaService.user.findUnique({ where: { uuid: userUuid } });
  }

  getUserFromToken(token: string): Promise<User> {
    const uuid = this.jwtService.decode(token)['userUuid'];
    return this.prismaService.user.findUnique({ where: { uuid } });
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
