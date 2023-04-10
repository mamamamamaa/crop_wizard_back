import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import {
  RegisterUser,
  User,
  UserDataForUpdate,
} from '../../schemas/user/user.interface';
import { USER_PROVIDE } from '../../schemas/user/user.providers';

@Injectable()
export class UserService {
  constructor(@Inject(USER_PROVIDE) private readonly userModel: Model<User>) {}

  async createUser(user: RegisterUser): Promise<User> {
    return this.userModel.create(user);
  }

  async findUser(key: string, value: string): Promise<User> {
    return this.userModel.findOne({ [key]: value });
  }

  async findUserById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async updateUser(id: string, newUserData: UserDataForUpdate) {
    return this.userModel.findByIdAndUpdate(id, newUserData);
  }
}
