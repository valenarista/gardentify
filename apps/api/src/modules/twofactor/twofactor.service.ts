import QRCode from 'qrcode';
import { PrismaService } from '@modules/prisma/prisma.service';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { GenerateTwoFactorInput } from './dto/generate-two-factor.input';
import { ValidateTwoFactorCodeInput } from './dto/validate-two-factor-code.input';
import { GenerateTwoFactorResponse } from './responses/generate-two-factor.response';
import { ValidateTwoFactorCodeResponse } from './responses/validate-two-factor-code.response';

@Injectable()
export class TwoFactorService {
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async generateTwoFactor(
    input: GenerateTwoFactorInput,
  ): Promise<GenerateTwoFactorResponse> {
    const twoFactorSecret = authenticator.generateSecret();

    const otpUrl = authenticator.keyuri(
      input.email,
      'Gardentify',
      twoFactorSecret,
    );

    await this.prismaService.user.update({
      where: { email: input.email },
      data: { twoFactorSecret },
    });
    return { otpUrl, twoFactorSecret };
  }

  async generateTwoFactorCode(otpUrl: string): Promise<string> {
    try {
      return await QRCode.toDataURL(otpUrl);
    } catch (error) {
      throw new BadRequestException('An error ocurred!');
    }
  }

  validateTwoFactorCode(
    input: ValidateTwoFactorCodeInput,
  ): ValidateTwoFactorCodeResponse {
    const valid = authenticator.verify({
      token: input.twoFactorCode,
      secret: input.userSecret,
    });
    return { valid };
  }
}
