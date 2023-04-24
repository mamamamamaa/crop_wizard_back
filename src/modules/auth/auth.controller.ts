import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { CreateUserDto } from '../../dto/user/create-user.dto';
import { Request, Response } from 'express';
import { LoginUserDto } from '../../dto/user/login-user.dto';
import { RequestWithUser } from '../../types/req.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() userData: LoginUserDto, @Res() res: Response) {
    return this.authService.signIn(userData, res);
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

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: RequestWithUser, @Res() res: Response) {
    return this.authService.googleLogin(req, res);
  }
}
