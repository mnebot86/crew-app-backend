import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = exception.getResponse() as 
      | { message: string | string[]; error?: string; statusCode?: number }
      | string;

    const message =
      exception instanceof BadRequestException && typeof exceptionResponse === 'object' && 'message' in exceptionResponse
        ? exceptionResponse.message
        : [exception.message || 'Internal server error'];

    response.status(status).json({
      statusCode: status,
      message,
      error: exception.name,
    });
  }
}
