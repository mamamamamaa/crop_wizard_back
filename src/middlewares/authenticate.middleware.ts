import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../modules/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticateMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async use(req: any, res: any, next: () => void) {
    const { authorization = '' } = req.headers;

    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer') {
      throw new UnauthorizedException();
    }

    const secret = this.configService.get<string>('ACCESS_SECRET_KEY');

    try {
      const { _id } = await this.jwtService.verifyAsync(token, {
        secret,
      });

      const user = await this.userService.findUserById(_id);

      if (!user || !user.accessToken) {
        throw new UnauthorizedException();
      }

      req.user = user;
      next();
    } catch {
      throw new UnauthorizedException();
    }
  }
}
