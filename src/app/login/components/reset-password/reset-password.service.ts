import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseHttpService } from '../../../shared/services/base-http.service';

@Injectable()
export class ResetPasswordService extends BaseHttpService {
  constructor(protected _httpPassthrough: Http) {
    super(_httpPassthrough);
  }

  sendEmail(enail: string) {}
}
