import { Observable } from 'rxjs/Observable';
import { BaseHttpService } from '../base-http.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NetworkErrorHandler } from '../network-error-handler';
import { apiRoutes } from '../../configurations/api-routes.configuration';
import { environment } from '../../../../environments/environment';
import { Job } from '../../../models/domain/Job';
@Injectable()
export class TodoHireService extends BaseHttpService {
  _route: string;
  constructor(
    protected _httpPassthrough: Http,
    protected _errorHandler: NetworkErrorHandler
  ) {
    super(_httpPassthrough, _errorHandler);
  }

  public get(): Observable<Job[]> {
    this._route = apiRoutes.get_todohire;
    const url = environment.apiUrl + (this._route ? this._route : '');
    return super.get(url);
  }
}
