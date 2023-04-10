import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { CreateUserDto } from '../../../schemas/user/create-user.dto';
import { MailService } from './mail.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  async signIn(userData: CreateUserDto) {
    const { email, password } = userData;

    const user = await this.userService.findUser('email', email);

    if (user && !user.verificationToken) {
      throw new HttpException('Email in use', HttpStatus.BAD_REQUEST);
    }

    if (user && user.verificationToken) {
      const verificationToken = await this.mailService.send(email);

      await this.userService.updateUser(user._id, { verificationToken });

      return { message: 'Verify your account by email', email };
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
  }

  async verify(token: string) {
    const user = await this.userService.findUser('verificationToken', token);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await
  }
}
