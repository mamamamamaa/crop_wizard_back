import { Model } from 'mongoose';
import { User } from '../../schemas/user/user.interface';
import { CreateUserDto } from '../../schemas/user/create-user.dto';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    createUser(createUserDto: CreateUserDto): Promise<User>;
}
