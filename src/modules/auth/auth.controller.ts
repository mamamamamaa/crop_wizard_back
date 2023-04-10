import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { CreateUserDto } from '../../schemas/user/create-user.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}
  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() userData: CreateUserDto) {
    return this.authService.signUp(userData);
  }

  @Get('verify/:verificationToken')
  verify(@Param('verificationToken') token: string, @Res() res: Response) {
    return this.authService.verify(token, res);
  }
}
