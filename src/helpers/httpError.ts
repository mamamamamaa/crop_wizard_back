import { HttpException } from '@nestjs/common';

const messages = {
  400: 'Bad request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not found',
  409: 'Conflict',
  500: 'Server error',
};

export const httpError = (status: number, message?: string) => {
  return new HttpException(message ?? messages[status], status);
};
