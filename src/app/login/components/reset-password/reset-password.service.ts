import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseHttpService } from '../../../shared/services/base-http.service';


import { NetworkErrorHandler} from '../../../shared/services/network-error-handler';
@Injectable()
export class ResetPasswordService extends BaseHttpService {
  constructor(protected _httpPassthrough: Http, protected _errorHandler: NetworkErrorHandler) {
    super(_httpPassthrough, _errorHandler);
  }

  sendEmail(enail: string) {}
}
