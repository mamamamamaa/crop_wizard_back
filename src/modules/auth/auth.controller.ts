import { Body, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../../schemas/user/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  register(@Body() userData: CreateUserDto) {}
}
