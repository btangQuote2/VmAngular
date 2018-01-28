import { Observable } from 'rxjs/Observable';
import { BaseHttpService } from '../base-http.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NetworkErrorHandler } from '../network-error-handler';
import { apiRoutes } from '../../configurations/api-routes.configuration';
import { environment } from '../../../../environments/environment';
import { TodoHire } from '../../../models/domain/TodoHire';
import { Job } from '../../../models/domain/Job';
import { DateFromTo } from '../../../models/domain/DateFromTo';
import { StartendEnum } from '../../../models/enum/StartendEnum';

@Injectable()
export class JobSearchService extends BaseHttpService {
  _route: string;
  constructor(
    protected _httpPassthrough: Http,
    protected _errorHandler: NetworkErrorHandler
  ) {
    super(_httpPassthrough, _errorHandler);
  }

  public Search(entity: DateFromTo): Observable<Job[]> {

    const parameters =
      `start=${entity.StartDate}` +
      `&` +
      `end=${entity.EndDate}`;

    this._route = apiRoutes.get_jobsearch + parameters;
    const url = environment.apiUrl + (this._route ? this._route : '');
    return super.get(url);
  }
}
