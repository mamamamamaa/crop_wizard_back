import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../schemas/user/user.interface';
import { USER_PROVIDE } from '../../schemas/user/user.providers';

@Injectable()
export class UserService {
  constructor(@Inject(USER_PROVIDE) private readonly userModel: Model<User>) {}

  async createUser(user: User) {
    return this.userModel.create(user);
  }

  async findUser(query: string) {
    return this.userModel.findOne({ [query]: query });
  }
}
