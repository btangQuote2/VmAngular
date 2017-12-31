import { HttpErrorResponse } from '@angular/common/http';
import {
  Http,
  RequestOptions,
  Headers,
  URLSearchParams,
  Response
} from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ObservableInput } from 'rxjs/Observable';
import { NetworkErrorHandler } from './network-error-handler';
@Injectable()
export class BaseHttpService {
  protected queryParams: URLSearchParams;

  constructor(
    private _http: Http,
    protected _errorHandler: NetworkErrorHandler
  ) {}

  /******************************************************************************************************************
   * Public Methods
   ******************************************************************************************************************/

  public get(url: string): Observable<any> {
    const headers = new Headers();
    this.addHeaders(headers);
    BaseHttpService.addJsonHeaders(headers);

    const options = new RequestOptions({ headers: headers });

    if (this.queryParams) {
      options.params = this.queryParams;
    }

    return this._http
      .get(url, options)
      .map(BaseHttpService.processSuccess)
      .catch(err => this.processError(err));
  }

  public post(url: string, payload: any): Observable<any> {
    const headers = new Headers();
    this.addHeaders(headers);
    BaseHttpService.addJsonHeaders(headers);

    const options = new RequestOptions({ headers: headers });

    return this._http
      .post(url, payload, options)
      .map(BaseHttpService.processSuccess)
      .catch(err => this.processError(err));
  }

  public postForm(url: string, data: any): Observable<any> {
    const headers = new Headers();
    this.addHeaders(headers);
    BaseHttpService.addJsonHeaders(headers);

    const options = new RequestOptions({
      headers: headers,
      withCredentials: true
    });

    const params = new URLSearchParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        params.set(key, data[key]);
      }
    }
    const result = this._http
      .post(url, params, options)
      .map(BaseHttpService.processSuccess)
      .catch(err => this.processError(err));

    return result;
  }

  public put(url: string, payload: any): Observable<any> {
    const headers = new Headers();
    this.addHeaders(headers);
    BaseHttpService.addJsonHeaders(headers);

    return this._http
      .put(url, payload, { headers: headers })
      .map(BaseHttpService.processIsSuccess)
      .catch(err => this.processError(err));
  }

  public delete(url: string) {
    const headers = new Headers();
    this.addHeaders(headers);
    return this._http.delete(url, { headers: headers });
  }

  public processError(err: HttpErrorResponse): ObservableInput<any> {
   return this._errorHandler.processError(err);
  }
  /******************************************************************************************************************
   * Protected Methods
   ******************************************************************************************************************/

  protected addHeaders(headers: Headers) {
    const authenticationData = JSON.parse(
      sessionStorage.getItem('authentication')
    );
    const tenant = JSON.parse(sessionStorage.getItem('tenant'));
    if (authenticationData && authenticationData.access_toekn) {
      headers.append(
        'Authorization',
        'bearer ' + authenticationData.access_token
      );
    }
    if (tenant) {
      headers.append('Tenant', tenant);
    }
  }
  /******************************************************************************************************************
   * Private Methods
   ******************************************************************************************************************/

  // tslint:disable-next-line:member-ordering
  private static addFormHeaders(headers: Headers) {
    headers.append('Content-type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');
  }

  // tslint:disable-next-line:member-ordering
  private static addJsonHeaders(headers: Headers) {
    headers.append('Content-type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('x-vms-version', '1');
    headers.append('x-vms-culture', 'en-US');

    headers.append('Access-Control-Allow-Origin', '*');
  }

  // tslint:disable-next-line:member-ordering
  private static processSuccess(response: Response) {
    try {
      const body = response.json();
      return body.data || body;
    } catch (error) {
      return response.status;
    }
  }

  // tslint:disable-next-line:member-ordering
  private static processIsSuccess(response: Response) {
    return response.status;
  }
}
