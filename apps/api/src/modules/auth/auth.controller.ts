import { IConfig } from '@modules/config/config.module';
import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { DiscordAuthGuard } from './guards/auth.guard';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private configService: ConfigService<IConfig>) {}
  /**
   * GET /api/auth/discord/login
   * This is the route the user will visit to authenticate with discord
   */
  @Get('/discord/login')
  @UseGuards(DiscordAuthGuard)
  discordLogin() {
    return;
  }

  /**
   * GET /api/auth/discord/redirect
   * This is the redirect URL the OAuth2 Provider will call for discord
   */
  @Get('/discord/redirect')
  @UseGuards(DiscordAuthGuard)
  discordRedirect(@Res() res: Response) {
    res.redirect(this.configService.get('auth', { infer: true }).redirect);
  }

  /**
   * GET /api/auth/providers
   * Retrieve the auth providers
   */
  @Get('providers')
  providers(@Res() res: Response) {
    return res.json({
      providers: [
        {
          id: 'discord',
          name: 'Discord',
          authUrl: `http://localhost:4000/api/v1/auth/discord/login`,
        },
      ],
    });
  }
}
