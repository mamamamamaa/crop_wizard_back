import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { CreateUserDto } from '../../dto/user/create-user.dto';
import { Response } from 'express';
import { LoginUserDto } from '../../dto/user/login-user.dto';
import { RequestWithUser } from '../../types/req.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() userData: LoginUserDto) {
    return this.authService.signIn(userData);
  }

  @Post('register')
  register(@Body() userData: CreateUserDto) {
    return this.authService.signUp(userData);
  }

  @Get('verify/:verificationToken')
  verify(@Param('verificationToken') token: string, @Res() res: Response) {
    return this.authService.verify(token, res);
  }

  @Get('current')
  current(@Req() { user }: RequestWithUser) {
    return this.authService.current(user);
  }

  @Get('logout')
  logout(@Req() { user }: RequestWithUser) {
    return this.authService.logout(user);
  }
}
