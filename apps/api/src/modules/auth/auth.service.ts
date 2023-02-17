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
import { MailerService } from '@modules/mailer/mailer.service';
import { RequestResetPasswordInput } from './dto/request-reset-password.input';
import { nanoid } from 'nanoid';
import { ResetPasswordInput } from './dto/reset-password.input';
import { RequestResetPasswordResponse } from './responses/request-reset-password.response';
import { ResetPasswordResponse } from './responses/reset-password.response';
import { LoginInput } from './dto/login.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(PrismaService)
    private readonly prismaService: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly mailerService: MailerService,
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

  async login(input: LoginInput): Promise<Token> {
    const user = await this.prismaService.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      throw new NotFoundException(`An error ocurred!`);
    }

    const passwordValid = await this.passwordService.validatePassword(
      input.password,
      user.password,
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    return this.generateTokens({
      userUuid: user.uuid,
    });
  }

  async requestResetPassword(
    input: RequestResetPasswordInput,
  ): Promise<RequestResetPasswordResponse> {
    const user = await this.prismaService.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      throw new NotFoundException('No user found with the given input!');
    }

    await this.prismaService.passwordReset.deleteMany({
      where: { userId: user.uuid },
    });

    const resetPasswordToken = nanoid();

    const passwordReset = await this.prismaService.passwordReset.create({
      data: {
        userId: user.uuid,
        token: resetPasswordToken,
      },
    });

    const passwordResetLink = `${
      this.configService.get('app', { infer: true }).clientUrl
    }/auth/reset-password?token=${passwordReset.token}`;

    await this.mailerService.sendEmail({
      template: 'reset-password',
      to: input.email,
      subject: 'Reset Password',
      from: 'gardentify@gmail.com',
      replacements: {
        username: user.username,
        email: user.email,
        link: passwordResetLink,
      },
    });

    return { emailSent: true };
  }

  async resetPassword(
    input: ResetPasswordInput,
  ): Promise<ResetPasswordResponse> {
    const passwordReset = await this.prismaService.passwordReset.findUnique({
      where: { token: input.token },
    });

    if (passwordReset === null || passwordReset.validUntil < new Date())
      throw new NotFoundException('No password reset request found!');

    const hashedPassword = await this.passwordService.hashPassword(
      input.password,
    );

    await this.prismaService.user.update({
      where: {
        uuid: passwordReset.userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    await this.prismaService.passwordReset.delete({
      where: { token: passwordReset.token },
    });

    return { success: true };
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
