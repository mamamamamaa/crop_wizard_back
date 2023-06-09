import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { MailService } from './mail.service';
import { LoginUserDto } from '../../../dto/user/login-user.dto';
import { CreateUserDto } from '../../../dto/user/create-user.dto';
import { UserService } from '../../user/user.service';
import { User } from '../../../types/user.interface';
import { RequestWithUser } from '../../../types/req.interface';

@Injectable()
export class AuthService {
  private readonly jwtOptions: { secret: string; expiresIn: string };
  private readonly clientUrl: string;
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.jwtOptions = {
      secret: this.configService.get<string>('ACCESS_SECRET_KEY'),
      expiresIn: this.configService.get<string>('EXPIRES_IN'),
    };

    this.clientUrl = this.configService.get<string>('CLIENT_URL');
  }

  async signIn(userData: LoginUserDto) {
    const { email, password } = userData;

    const user = await this.userService.findUser({ email }, '+password');

    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.NOT_FOUND,
      );
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      throw new HttpException('Invalid email or password', HttpStatus.CONFLICT);
    }

    if (!user.verify) {
      return this.resendVerificationMessage(user);
    }

    const payload = { _id: user._id };

    const accessToken = await this.jwtService.signAsync(
      payload,
      this.jwtOptions,
    );

    await this.userService.updateUser(user._id, { accessToken });

    return {
      accessToken,
      user: {
        username: user.username,
        email: user.email,
        avatarUrl: user.avatarUrl,
      },
    };
  }

  async signUp(userData: CreateUserDto) {
    try {
      const { email, password, username } = userData;

      const user = await this.userService.findUser({ email });

      if (user && user.verify) {
        throw new HttpException('Email in use', HttpStatus.BAD_REQUEST);
      }

      if (user && !user.verify) {
        return this.resendVerificationMessage(user);
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const verificationToken = await this.mailService.send(email);

      const avatarUrl = this.userService.getAvatarUrl();

      const payloadToRegister = {
        ...userData,
        password: hashPassword,
        verificationToken,
        avatarUrl,
      };

      await this.userService.createUser(payloadToRegister);

      return { message: 'Verify your account by email', email, username };
    } catch {
      throw new HttpException('Server error', 500);
    }
  }

  async verify(token: string, res: Response) {
    const user = await this.userService.findUser({
      verificationToken: token,
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const payload = { _id: user._id };

    const accessToken = await this.jwtService.signAsync(
      payload,
      this.jwtOptions,
    );

    await this.userService.updateUser(user._id, {
      verify: true,
      verificationToken: null,
      accessToken,
    });

    res.redirect(`${this.clientUrl}?accessToken=${accessToken}`);
  }

  async reverify(email: string) {
    const user = await this.userService.findUser({ email });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.verify) {
      throw new HttpException('User already verified', HttpStatus.NOT_FOUND);
    }

    return this.resendVerificationMessage(user);
  }

  current({ email, username, avatarUrl }: User) {
    return { email, username, avatarUrl };
  }

  async logout({ _id }: User) {
    try {
      await this.userService.updateUser(_id, { accessToken: null });
    } catch {
      throw new HttpException('Server error', 500);
    }
  }

  async googleLogin(req: RequestWithUser, res: Response) {
    const { _id } = req.user;

    const payload = { _id };

    const accessToken = await this.jwtService.signAsync(
      payload,
      this.jwtOptions,
    );

    await this.userService.updateUser(
      _id,
      { accessToken },
      '-verificationToken -accessToken -verify -updatedAt -createdAt',
    );

    // <========= Cookie ==========>

    // const cookieOptions = {
    //   httpOnly: false,
    //   maxAge: 3600000,
    // };

    // const userJson = JSON.stringify({
    //   username: user.username,
    //   email: user.email,
    // });

    // res.cookie('user', userJson, cookieOptions);
    // res.cookie('accessToken', accessToken, cookieOptions);
    //
    // res.redirect(this.clientUrl);

    // </========= Cookie ==========>

    res.redirect(`${this.clientUrl}?accessToken=${accessToken}`);
  }

  private async resendVerificationMessage({ email, _id }: User) {
    const verificationToken = await this.mailService.send(email);

    await this.userService.updateUser(_id, { verificationToken });

    return { message: 'Verify your account by email', email };
  }
}
