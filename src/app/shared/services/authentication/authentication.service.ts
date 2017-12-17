import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http.service';
import { Http } from '@angular/http';
import { AuthorizationService } from '../authorization/authorization.service';
import { apiRoutes } from '../../configurations/api-routes.configuration';
@Injectable()
export class AuthenticationService extends BaseHttpService {
  constructor(
    private _httpPassthrough: Http,
    private _authorizationService: AuthorizationService
  ) {
    super(_httpPassthrough);
  }

  public login(username: string, password: string) {
    const url = environment.apiUrl + apiRoutes.authentication;
    const payload = {
      grant_type: 'password',
      username: username,
      password: password
    };

    return super.postForm(url, payload);
  }

  public isLoggedIn(): boolean {
    const authenticationData = JSON.parse(
      sessionStorage.getItem('authentication')
    );
    if (authenticationData && authenticationData.access_token) {
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
