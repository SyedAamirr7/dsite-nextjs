import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const rawResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception instanceof Error
          ? exception.message
          : 'Internal server error';

    let errorMessage: string;
    if (typeof rawResponse === 'string') {
      errorMessage = rawResponse;
    } else if (rawResponse && typeof rawResponse === 'object') {
      const anyResponse = rawResponse as { message?: string | string[]; error?: string };
      if (Array.isArray(anyResponse.message) && anyResponse.message.length > 0) {
        errorMessage = String(anyResponse.message[0]);
      } else if (typeof anyResponse.message === 'string' && anyResponse.message) {
        errorMessage = anyResponse.message;
      } else if (typeof anyResponse.error === 'string' && anyResponse.error) {
        errorMessage = anyResponse.error;
      } else {
        errorMessage = 'Internal server error';
      }
    } else {
      errorMessage = 'Internal server error';
    }

    // Log so you can see the real cause in the backend terminal (e.g. DB error, JWT_SECRET)
    this.logger.error(
      `${req.method} ${req.url} ${status} - ${errorMessage}`,
      exception instanceof Error ? exception.stack : undefined,
    );

    res.status(status).json({
      success: false,
      error: status === 500 ? 'Server error. Please try again.' : errorMessage,
    });
  }
}
