import { Observable } from 'rxjs/Rx';
import { BaseHttpService } from './../base-http.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NetworkErrorHandler } from '../network-error-handler';
import { apiRoutes } from '../../configurations/api-routes.configuration';
import { environment } from '../../../../environments/environment';
import { Job } from '../../../models/domain/Job';

@Injectable()
export class JobsService extends BaseHttpService {
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
  public Get(id: number): Observable<Job> {
    this._route = apiRoutes.get_job + id;
    const url = environment.apiUrl + (this._route ? this._route : '');
    return super.get(url);
  }

  /**
   * Delete
   id:number   */
  public Delete(id: number) {
    this._route = apiRoutes.get_job + id;
    const url = environment.apiUrl + (this._route ? this._route : '');
    return super.delete(url);
  }

  /**
   * Put
   id:number   */
  public Put(id: number, entity: Job): Observable<any> {
    this._route = apiRoutes.get_job + id;
    const url = environment.apiUrl + (this._route ? this._route : '');
    return super.put(url, entity);
  }

  /*** Post */
  public Post(entity: Job): Observable<any> {
    this._route = apiRoutes.get_job;
    const url = environment.apiUrl + (this._route ? this._route : '');
    return super.post(url, entity);
  }

  /**
   * Patch
   id: number, entity:Job   */
  public Patch(id: number, entity: Job) {
    this._route = apiRoutes.get_job + id;
    const url = environment.apiUrl + (this._route ? this._route : '');
    return super.put(url, entity);
  }
}
