import { UserService } from './user.service';
import { CreateUserDto } from '../../schemas/user/create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserDto: CreateUserDto): Promise<import("../../schemas/user/user.interface").User>;
}
