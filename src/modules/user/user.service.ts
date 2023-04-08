import { Inject, Injectable } from '@nestjs/common';
import { USER_PROVIDE } from '../../schemas/user/user.providers';
import { Model } from 'mongoose';
import { User } from '../../schemas/user/user.interface';
import { CreateUserDto } from '../../schemas/user/create-user.dto';
import { httpError } from '../../helpers/httpError';
import bcrypt from 'bcryptjs';
import { verificationMessage } from '../../helpers';

@Injectable()
export class UserService {
  constructor(@Inject(USER_PROVIDE) private readonly userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { email, password } = createUserDto;

      const user = await this.userModel.findOne({ email });

      if (user) {
        throw httpError(409, 'Email in use');
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const { verificationToken, verifyMessage } = verificationMessage(email);
      await sendMail.send(verifyMessage);

      await User.create({
        ...req.body,
        password: hashPassword,
        verificationToken,
      });

      res.status(201).json({
        message: 'Verify your account by email',
        email,
      });

      return this.userModel.create(createUserDto);
    } catch (err) {
      return err;
    }
  }
}
