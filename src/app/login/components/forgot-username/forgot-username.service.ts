import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../../shared/services/base-http.service';
import { Http } from '@angular/http';
import { NetworkErrorHandler } from '../../../shared/services/network-error-handler';
import { Observable } from 'rxjs/Observable';
import { apiRoutes } from '../../../shared/configurations/api-routes.configuration';
import { environment } from '../../../../environments/environment';
import { PasswordUpdateRequest } from '../../../models/request/PasswordUpdateRequest';
import { UserNameUpdateRequest } from '../../../models/request/UserNameUpdateRequest';
import { UrlParamsEnum } from '../../../models/enum/url-paramsEnum';
@Injectable()
export class ForgotUsernameService extends BaseHttpService {
  _route: string;
  constructor(
    protected _httpPassthrough: Http,
    protected _errorHandler: NetworkErrorHandler
  ) {
    super(_httpPassthrough, _errorHandler);
  }
  /*** forgetUserName: Observerable<string>  */
  public forgetUsername(entity: UserNameUpdateRequest): Observable<string> {

    const paramters = `${UrlParamsEnum.clientId}=${entity.clientId}&${UrlParamsEnum.email}=${
      entity.email
    }&${UrlParamsEnum.who}=${entity.who}`;
    this._route = apiRoutes.put_forgetPassword + paramters;
    const url = environment.apiUrl + (this._route ? this._route : '');
    return super.put(url, entity);
  }
}
