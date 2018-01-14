import { environment } from './../../../environments/environment';
import { apiRoutes } from './../../shared/configurations/api-routes.configuration';
import { LocalStorageService } from './../../shared/services/local-storage.service';
import { NetworkErrorHandler } from './../../shared/services/network-error-handler';
import { Subject } from 'rxjs/Subject';
import { BaseHttpService } from './../../shared/services/base-http.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Dashborad } from '../../models/domain/Dashboard';

@Injectable()
export class DashboradService extends BaseHttpService {
  _route: string;

  _entity$ = new Subject();

  constructor(
    protected _httpPassthrough: Http,
    protected _errorHandlerPassthrough: NetworkErrorHandler,
    protected _localStoragePassthrough: LocalStorageService<string>
  ) {
    super(_httpPassthrough, _errorHandlerPassthrough);
  }

  public getDashboard(): Observable<Dashborad[]> {
    this._route = apiRoutes.get_dashboard;
    const url = environment.apiUrl + (this._route ? this._route : '');
    return super.get(url);
  }

  public getDashboardById(id: string): Observable<Dashborad> {
    this._route = apiRoutes.get_dashboard + id;
    const url = environment.apiUrl + (this._route ? this._route : '');
    return super.get(url);
  }

  public postDashboard(entity: Dashborad): Observable<Dashborad> {
    this._route = apiRoutes.post_dashboard;
    const url = environment.apiUrl + (this._route ? this._route : '');
    return super.post(url, entity);
  }

  public putDashboard(entity: Dashborad): Observable<Dashborad> {
    this._route = apiRoutes.put_dashboard + entity.id;
    const url = environment.apiUrl + (this._route ? this._route : '');
    return super.put(url, entity);
  }

  public deleteDashboard(id: string): Observable<void> {
    this._route = apiRoutes.delete_dashboard + id;
    const url = environment.apiUrl + (this._route ? this._route : '');

    return super
      .delete(url)
      .do(response => {
        console.log('delete record with id ', id);
      })
      .map(() => {});
  }
}
