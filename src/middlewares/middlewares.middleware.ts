import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MiddlewaresMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}
  use(req: any, res: any, next: () => void) {
    next();
  }
}
