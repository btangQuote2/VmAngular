import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseHttpService } from '../base-http.service';
import { environment } from '../../../../environments/environment';
import { apiRoutes } from '../../configurations/api-routes.configuration';
import { AuthorizationResponse } from '../../../models/response/authorization-response';
@Injectable()
export class AuthorizationService extends BaseHttpService {

  constructor(private _httpPassthrough: Http) {
    super(_httpPassthrough);
   }

   getPermssions() {

  const url = environment.apiUrl + apiRoutes.authorization;

  return super.get(url)
  .subscribe(


    data => {
      console.log('getPermsions response', <AuthorizationResponse> data);
    },
    error => {
console.log('error');
    }

  );

   }
}
