import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseHttpService } from '../../../shared/services/base-http.service';

import { NetworkErrorHandler } from '../../../shared/services/network-error-handler';
import { PasswordUpdateRequest } from '../../../models/request/PasswordUpdateRequest';
import { PassowordUpdateResponse } from '../../../models/response/PasswordUpdateResponse';
import { apiRoutes } from '../../../shared/configurations/api-routes.configuration';
import { environment } from '../../../../environments/environment';
import { UrlParamsEnum } from '../../../models/enum/url-paramsEnum';
@Injectable()
export class ResetPasswordService extends BaseHttpService {
  _route: string;
  constructor(
    protected _httpPassthrough: Http,
    protected _errorHandler: NetworkErrorHandler
  ) {
    super(_httpPassthrough, _errorHandler);
  }

  sendEmail(enail: string) {}

  public changePassword(
    entity: PasswordUpdateRequest
  ): Observable<PassowordUpdateResponse> {
    const paramters = `${UrlParamsEnum.clientId}=${entity.clientId}&${entity.userName}=${
      entity.userName
    }&${UrlParamsEnum.oldPassword}=${entity.oldPassword}&${UrlParamsEnum.newPassword}=${entity.newPassword}`;

    this._route = apiRoutes.put_changePassword + paramters;
    const url = environment.apiUrl + (this._route ? this._route : '');
    return super.put(url, entity);
  }
}
