import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  const clientUrl = configService.get<string>('CLIENT_URL');

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://localhost:3000', clientUrl],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  await app.listen(port);

  console.log(`Application is running on port: ${port}`);
}
bootstrap();
