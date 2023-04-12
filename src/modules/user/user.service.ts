import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { USER_PROVIDE } from '../../schemas/user/user.providers';
import {
  OptionalUserFields,
  RegisterUser,
  User,
} from '../../types/user.interface';

@Injectable()
export class UserService {
  constructor(@Inject(USER_PROVIDE) private readonly userModel: Model<User>) {}

  async createUser(user: RegisterUser): Promise<User> {
    return this.userModel.create(user);
  }

  async findUser(query: OptionalUserFields, select?: string): Promise<User> {
    return this.userModel.findOne(query).select(select || '');
  }

  async findUserById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async updateUser(
    id: string,
    newUserData: OptionalUserFields,
    select?: string,
  ) {
    return this.userModel.findByIdAndUpdate(id, newUserData).select(select);
  }
}