import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-apple';

@Injectable()
export class AppleStrategy extends PassportStrategy(Strategy, 'apple') {
  constructor() {
    super({
      clientID: process.env.APPLE_CLIENT_ID,
      teamID: process.env.APPLE_TEAM_ID,
      keyID: process.env.APPLE_KEY_ID,
      privateKeyString: process.env.APPLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      callbackURL: 'http://localhost:3000/api/v1/auth/apple/callback',
    });
  }

  async validate(idToken: string, accessToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { sub, email } = profile;
    const user = {
      provider: 'apple',
      providerId: sub,
      email,
    };
    done(null, user);
  }
}
