import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { Http } from '@angular/http';
import { AuthorizationService } from '../authorization/authorization.service';
import { apiRoutes } from '../../configurations/api-routes.configuration';

import { NetworkErrorHandler } from '../network-error-handler';
@Injectable()
export class AuthenticationService extends BaseHttpService {
  constructor(
    private _httpPassthrough: Http,
    protected _errorHandler: NetworkErrorHandler
  ) {
    super(_httpPassthrough, _errorHandler);
  }

  public login(username: string, password: string) {
    const url = environment.apiUrl + apiRoutes.authentication;

    const payload = {
      clientId: 'default',
      userName: username, // 'gchan',
      password: password, // '1',
      who: 'ClientUser'
    };

    const result = super.post(url, payload);
    return result;
  }

  public isLoggedIn(): boolean {
    const authenticationData = JSON.parse(
      sessionStorage.getItem('authentication')
    );
    if (authenticationData && authenticationData.token) {
      return true;
    }
    return false;
  }

  public logout() {
    if (sessionStorage.getItem('authentication')) {
      sessionStorage.clear();
    }
  }

  public getToken(): string {
    const authenticationData = JSON.parse(
      sessionStorage.getItem('authentication')
    );

    // tslint:disable-next-line:whitespace
    if (authenticationData && authenticationData.access_token) {
      return authenticationData.access_token;
    }

    return null;
  }
}
