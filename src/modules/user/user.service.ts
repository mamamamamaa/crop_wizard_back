import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import {
  OptionalUserFields,
  RegisterUser,
  User,
} from '../../types/user.interface';
import { USER_PROVIDE } from '../../schemas/user/user.providers';

@Injectable()
export class UserService {
  constructor(@Inject(USER_PROVIDE) private readonly userModel: Model<User>) {}

  getAvatarUrl(): string {
    const seed = Math.random().toString(36).substring(7); // Generate a random seed

    return `https://api.dicebear.com/6.x/adventurer/png?seed=${seed}`;
  }

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
