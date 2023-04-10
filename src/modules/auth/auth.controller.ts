import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { CreateUserDto } from '../../schemas/user/dto/create-user.dto';
import { Response } from 'express';
import { LoginUserDto } from '../../schemas/user/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() userData: LoginUserDto) {
    return this.authService.signIn(userData);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() userData: CreateUserDto) {
    return this.authService.signUp(userData);
  }

  @Get('verify/:verificationToken')
  verify(@Param('verificationToken') token: string, @Res() res: Response) {
    return this.authService.verify(token, res);
  }

  @Get('current')
  current(@Req() req) {
    console.log(req.user);
  }
}
