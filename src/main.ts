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
      whitelist: true, // Automatically strip unwanted properties
      forbidNonWhitelisted: true, // Throw error for extra properties not in DTO
      transform: true, // Automatically transform payloads to DTO classes
      exceptionFactory: (errors) => {
        // Customize validation error format
        const messages = errors.map((error) => ({
          field: error.property,
          message: Object.values(error.constraints || {}).join(', '),
        }));

        return new BadRequestException(messages);
      },
    }),
  );

  // Global filter to handle all non-validation exceptions
  app.useGlobalFilters(new HttpErrorFilter());

  await app.listen(3000);
}

bootstrap();
