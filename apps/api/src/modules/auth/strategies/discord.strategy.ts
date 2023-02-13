import { Inject, Injectable } from '@nestjs/common';
import { Profile, Strategy } from 'passport-discord';
import { PassportStrategy } from '@nestjs/passport';
import { AuthenticationProvider, UserDetails } from '../auth';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(
    @Inject('AUTH_SERVICE') private authService: AuthenticationProvider,
  ) {
    super({
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: 'http://localhost:4000/api/v1/auth/discord/redirect',
      scope: ['identify'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { username, id, avatar } = profile;
    const details: UserDetails = {
      username,
      oauthId: id,
      avatar,
      accessToken,
      refreshToken,
    };
    return this.authService.validateUser(details);
  }
}
