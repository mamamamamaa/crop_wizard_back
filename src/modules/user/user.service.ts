import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { RegisterUser, User } from '../../schemas/user/user.interface';
import { USER_PROVIDE } from '../../schemas/user/user.providers';

@Injectable()
export class UserService {
  constructor(@Inject(USER_PROVIDE) private readonly userModel: Model<User>) {}

  async createUser(user: RegisterUser) {
    return this.userModel.create(user);
  }

  async findUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findUserById(id: string) {
    return this.userModel.findById(id);
  }
}
