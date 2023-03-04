import QRCode from 'qrcode';
import { BadRequestException, Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { GenerateTwoFactorInput } from './dto/generate-two-factor.input';
import { ValidateTwoFactorCodeInput } from './dto/validate-two-factor-code.input';
import { GenerateTwoFactorResponse } from './responses/generate-two-factor.response';
import { ValidateTwoFactorCodeResponse } from './responses/validate-two-factor-code.response';

@Injectable()
export class TwoFactorService {
  async generateTwoFactor(
    input: GenerateTwoFactorInput,
  ): Promise<GenerateTwoFactorResponse> {
    try {
      const twoFactorSecret = authenticator.generateSecret();

      const otpUrl = authenticator.keyuri(
        input.email,
        'Gardentify',
        twoFactorSecret,
      );

      return { otpUrl, twoFactorSecret };
    } catch (error) {
      throw new BadRequestException('An error ocurred!');
    }
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
    try {
      const valid = authenticator.verify({
        token: input.twoFactorCode,
        secret: input.userSecret,
      });
      return { valid };
    } catch (err) {
      throw new BadRequestException('An error ocurred!');
    }
  }
}
