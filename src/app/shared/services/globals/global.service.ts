import { IdentityPermissions } from './../../../models/domain/Permissions';
import { getTestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { BaseHttpService } from '../base-http.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NetworkErrorHandler } from '../network-error-handler';
import { apiRoutes } from '../../configurations/api-routes.configuration';
import { environment } from '../../../../environments/environment';
import { DateFromTo } from '../../../models/domain/DateFromTo';
import { Assignment } from '../../../models/domain/Assignment';
@Injectable()
export class GlobalService extends BaseHttpService {
  _route: string;
  constructor(
    protected _httpPassthrough: Http,
    protected _errorHandler: NetworkErrorHandler
  ) {
    super(_httpPassthrough, _errorHandler);
  }

  /**
   * Get
   id:number   */
  public Get(id: number) {
    const parameters = `ClintId=${id}`;
    this._route = apiRoutes.get_languages + parameters;
    const url = environment.apiUrl + (this._route ? this._route : '');
    return super.get(url);
  }
}
