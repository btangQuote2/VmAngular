import { Observable } from 'rxjs/Observable';
import { BaseHttpService } from '../base-http.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NetworkErrorHandler } from '../network-error-handler';
import { apiRoutes } from '../../configurations/api-routes.configuration';
import { environment } from '../../../../environments/environment';
import { KeyValue } from '../../../models/domain/KeyValue';
@Injectable()
export class SettingService extends BaseHttpService {
  _route: string;
  constructor(
    protected _httpPassthrough: Http,
    protected _errorHandler: NetworkErrorHandler
  ) {
    super(_httpPassthrough, _errorHandler);
  }

  public get(): Observable<KeyValue> {
    this._route = apiRoutes.get_setting;
    const url = environment.apiUrl + (this._route ? this._route : '');
    return super.get(url);
  }
}
