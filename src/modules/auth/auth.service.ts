import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../../schemas/user/create-user.dto';
import { MailService } from '../mail/mail.service';
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private mailService: MailService,
  ) {}

  async signIn(userData: CreateUserDto) {
    const { email, password } = userData;

    const user = await this.userService.findUserByEmail(email);

    if (user) {
      throw new HttpException('Email in use', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const verificationToken = await this.mailService.verificationMessage(email);
    const stringifyToken = String(verificationToken);

    const payloadToRegister = {
      ...userData,
      password: hashPassword,
      verificationToken: stringifyToken,
    };

    await this.userService.createUser(payloadToRegister);

    return { message: 'Verify your account by email', email };
  }
}
