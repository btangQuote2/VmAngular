import {APIValidationError} from './ValidatetionError';
import {HttpErrorResponse} from '@angular/common/http';

export class ServerErrorResponse {
  Message: string;
  ValidationErrors: APIValidationError[];

  static fromAPIData(err: HttpErrorResponse): ServerErrorResponse {
    const data = (err as any).json();

    const validationErrors: APIValidationError[] = [];

    const errors = data['ValidationErrors'];

    if (errors && errors.length > 0) {

      for (const error of errors) {

        validationErrors
          .push(new APIValidationError(error['Message'] || '', error['Property'] || ''));

      }
    }

    const message = data['Message'] || data['error_description'] || '';
    return new this(message, validationErrors);
  }

  constructor(message: string, validationErrors: APIValidationError[] = []) {
    this.Message = message;
    this.ValidationErrors = validationErrors;
  }
}
