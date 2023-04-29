import * as bcrypt from 'bcrypt';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';
import { Types } from 'mongoose';
import { Request } from 'express';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }
  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (error: any, user?: any, info?: any) => void,
  ): Promise<any> {
    try {
      const { emails, displayName, photos } = profile;

      const { value: email } = emails[0];
      const { value: avatarUrl = null } = photos[0];

      const user = await this.userService.findUser({ email });

      if (user) {
        return done(null, user);
      }

      const tempPassword = String(new Types.ObjectId());

      const hashPassword = await bcrypt.hash(tempPassword, 10);

      const newUser = await this.userService.createUser({
        email,
        username: displayName,
        password: hashPassword,
        verificationToken: null,
        verify: true,
        avatarUrl,
      });

      done(null, newUser);
    } catch (error) {
      done(error);
    }
  }
}
