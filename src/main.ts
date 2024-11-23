// main.ts
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpErrorFilter } from './filters/http-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const messages = errors.map((error) => {
          const constraints = error.constraints
            ? Object.values(error.constraints).join(', ')
            : 'Validation failed';

          return `${error.property}: ${constraints}`;
        });

        return new BadRequestException(messages);
      },
    }),
  );

  app.useGlobalFilters(new HttpErrorFilter());

  await app.listen(3000);
}

bootstrap();
