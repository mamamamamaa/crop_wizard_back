import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { LoginUserDto } from '../../../dto/user/login-user.dto';
import { CreateUserDto } from '../../../dto/user/create-user.dto';
import { UserService } from '../../user/user.service';
import { User } from '../../../types/user.interface';
import { RequestWithUser } from '../../../types/req.interface';
export declare class AuthService {
    private readonly userService;
    private readonly mailService;
    private readonly configService;
    private readonly jwtService;
    private readonly jwtOptions;
    private readonly clientUrl;
    constructor(userService: UserService, mailService: MailService, configService: ConfigService, jwtService: JwtService);
    signIn(userData: LoginUserDto): Promise<{
        message: string;
        email: string;
    } | {
        username: string;
        email: string;
        accessToken: string;
    }>;
    signUp(userData: CreateUserDto): Promise<{
        message: string;
        email: string;
    }>;
    verify(token: string, res: Response): Promise<void>;
    current({ email, username }: User): {
        email: string;
        username: string;
    };
    logout({ _id }: User): Promise<void>;
    googleLogin(req: RequestWithUser, res: Response): Promise<void>;
    private reverify;
}
