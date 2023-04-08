import bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { httpError, MailerHelper } from '../../helpers';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../schemas/user/user.interface';
import { USER_PROVIDE } from '../../schemas/user/user.providers';
import { CreateUserDto } from '../../schemas/user/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly mailerHelper: MailerHelper,
    @Inject(USER_PROVIDE) private readonly userModel: Model<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const { email, password } = createUserDto;

      const user = await this.userModel.findOne({ email });

      if (user) {
        throw httpError(409, 'Email in use');
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const verificationToken = await this.mailerHelper.verificationMessage(
        email,
      );

      await this.userModel.create({
        ...createUserDto,
        password: hashPassword,
        verificationToken,
      });

      return {
        message: 'Verify your account by email',
        email,
      };
    } catch (err) {
      return err;
    }
  }
}
