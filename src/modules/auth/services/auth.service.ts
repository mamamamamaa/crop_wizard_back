import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { MailService } from './mail.service';
import { UserService } from '../../user/user.service';
import { User } from '../../../schemas/user/user.interface';
import { LoginUserDto } from '../../../schemas/user/dto/login-user.dto';
import { CreateUserDto } from '../../../schemas/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(userData: LoginUserDto) {
    try {
      const { email, password } = userData;
      const user = await this.userService.findUser('email', email, '+password');

      if (!user) {
        throw new HttpException(
          'Invalid email or password',
          HttpStatus.CONFLICT,
        );
      }

      const comparePassword = await bcrypt.compare(password, user.password);

      if (!comparePassword) {
        throw new HttpException(
          'Invalid email or password',
          HttpStatus.CONFLICT,
        );
      }

      if (!user.verify) {
        return this.reverify(user);
      }

      const payload = { _id: user._id };
      const secret = this.configService.get<string>('ACCESS_SECRET_KEY');
      const expiresIn = this.configService.get<string>('EXPIRES_IN');

      const accessToken = await this.jwtService.signAsync(payload, {
        secret,
        expiresIn,
      });

      await this.userService.updateUser(user._id, { accessToken });

      return { username: user.username, email, accessToken };
    } catch (err) {
      throw new HttpException('Server error', 500);
    }
  }

  async signUp(userData: CreateUserDto) {
    try {
      const { email, password } = userData;

      const user = await this.userService.findUser('email', email);

      if (user && user.verify) {
        throw new HttpException('Email in use', HttpStatus.BAD_REQUEST);
      }

      if (user && !user.verify) {
        return this.reverify(user);
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const verificationToken = await this.mailService.send(email);

      const payloadToRegister = {
        ...userData,
        password: hashPassword,
        verificationToken,
      };

      await this.userService.createUser(payloadToRegister);

      return { message: 'Verify your account by email', email };
    } catch {
      throw new HttpException('Server error', 500);
    }
  }

  async verify(token: string, res: Response) {
    try {
      const user = await this.userService.findUser('verificationToken', token);

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const clientUrl = this.configService.get<string>('CLIENT_URL');

      await this.userService.updateUser(user._id, {
        verify: true,
        verificationToken: null,
      });

      res.redirect(clientUrl);
    } catch {
      throw new HttpException('Server error', 500);
    }
  }

  private async reverify({ email, _id }: User) {
    const verificationToken = await this.mailService.send(email);

    await this.userService.updateUser(_id, { verificationToken });

    return { message: 'Verify your account by email', email };
  }
}
