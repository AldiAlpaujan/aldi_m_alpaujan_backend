import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import z, { ZodError } from 'zod';

export enum ErrorDetail400 {
  BAD_MODEL_REQUEST = 'bad_model_request',
  BAD_MESSAGE = 'bad_request_message',
}

@Catch(ZodError, HttpException)
export class ErrorFilter implements ExceptionFilter {
  catch(err: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    console.info('hello ada error nih');
    if (err instanceof HttpException) {
      response.status(err.getStatus()).json({
        code: err.getStatus(),
        message: err.message,
      });
    } else if (err instanceof ZodError) {
      response.status(400).json({
        code: 400,
        errorDetail: ErrorDetail400.BAD_MODEL_REQUEST,
        message: 'validation error',
        errors: z.treeifyError(err),
      });
    } else {
      response.status(500).json({
        code: 500,
        message: 'Internal Server Error',
      });
    }
  }
}
