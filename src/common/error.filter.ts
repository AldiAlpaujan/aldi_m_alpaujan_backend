import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ZodError, ZodType } from 'zod';

enum ErrorDetail404 {
  BAD_MODEL_REQUEST = 'bad_model_request',
  BAD_MESSAGE = 'bad_request_message',
}

@Catch(ZodType, HttpException)
export class ErrorFilter implements ExceptionFilter {
  catch(err: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    if (err instanceof HttpException) {
      response.status(err.getStatus()).json({
        code: err.getStatus(),
        message: err.message,
        errors: err.getResponse(),
      });
    } else if (err instanceof ZodError) {
      response.status(400).json({
        code: 400,
        errorDetail: ErrorDetail404.BAD_MODEL_REQUEST,
        message: 'validation error',
        errors: err,
      });
    } else {
      response.status(500).json({
        code: 500,
        message: 'Internal Server Error',
      });
    }
  }
}
