import { AuthService } from './services/auth.service';
import { CreateUserDto } from '../../dto/user/create-user.dto';
import { Request, Response } from 'express';
import { LoginUserDto } from '../../dto/user/login-user.dto';
import { RequestWithUser } from '../../types/req.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(userData: LoginUserDto): Promise<{
        message: string;
        email: string;
    } | {
        username: string;
        email: string;
        accessToken: string;
    }>;
    register(userData: CreateUserDto): Promise<{
        message: string;
        email: string;
    }>;
    verify(token: string, res: Response): Promise<void>;
    current({ user }: RequestWithUser): {
        email: string;
        username: string;
    };
    logout({ user }: RequestWithUser): Promise<void>;
    googleAuth(req: Request): Promise<void>;
    googleAuthRedirect(req: RequestWithUser, res: Response): Promise<void>;
}
