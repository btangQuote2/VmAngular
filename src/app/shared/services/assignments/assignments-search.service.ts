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
export class AssignmentSearchService extends BaseHttpService {
  _route: string;
  constructor(
    protected _httpPassthrough: Http,
    protected _errorHandler: NetworkErrorHandler
  ) {
    super(_httpPassthrough, _errorHandler);
  }

  public Search(entity: DateFromTo): Observable<string[]> {
    const parameters = `${entity.StartDate}` + `/` + `${entity.EndDate}`;
    this._route = apiRoutes.get_assignmentSearch;
    const url = environment.apiUrl + (this._route ? this._route : '');
    return super.get(url);
  }

  /**
   * Get
   id:number   */
  public Get(id: number) {
    this._route = apiRoutes.get_assignment + id;
    const url = environment.apiUrl + (this._route ? this._route : '');
    return super.get(url);
  }


  /**
   * Post
   */
  public Post(payload: any) {
    this._route = apiRoutes.post_assignment ;
    const url = environment.apiUrl + (this._route ? this._route : '');
    return super.put(url, payload);
  }
  /**
   * Put
   id:number   */
  public Put(id: number, payload: any): Observable<any> {
    this._route = apiRoutes.get_assignment + id;
    const url = environment.apiUrl + (this._route ? this._route : '');
    return super.put(url, payload);
  }

  /**
   * Delete
   */
  public Delete(id: number) {
    this._route = apiRoutes.delete_assignment + id;
    const url = environment.apiUrl + (this._route ? this._route : '');
    return super.delete(url);
  }
}
