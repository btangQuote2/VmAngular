import { Observable } from 'rxjs/Observable';
import { BaseHttpService } from '../base-http.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NetworkErrorHandler } from '../network-error-handler';
import { apiRoutes } from '../../configurations/api-routes.configuration';
import { environment } from '../../../../environments/environment';
import { Calendar } from '../../../models/domain/Calendar';
import { DateFromTo } from '../../../models/domain/DateFromTo';

@Injectable()
export class CalendersService extends BaseHttpService {
  _route: string;
  constructor(
    protected _httpPassthrough: Http,
    protected _errorHandler: NetworkErrorHandler
  ) {
    super(_httpPassthrough, _errorHandler);
  }

  public Get(entity: DateFromTo): Observable<Calendar[]> {
    const parameters = `${entity.StartDate}` + `/` + `${entity.EndDate}`;

    this._route = apiRoutes.get_calenders + parameters;
    const url = environment.apiUrl + (this._route ? this._route : '');
    return super.get(url);
  }
}
