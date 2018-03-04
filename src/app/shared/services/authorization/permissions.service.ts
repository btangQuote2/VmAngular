import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Permissions } from '../../../models/domain/Permissions';
import { Http } from '@angular/http';
import { NetworkErrorHandler } from '../network-error-handler';
import { LocalStorageService } from '../local-storage.service';

@Injectable()
export class PermissionsService {
  protected _entity$ = new Subject<Permissions>();
  constructor(
    protected _httpPassthrough: Http,
    protected _errorHandlerPassthrough: NetworkErrorHandler,
    protected _localStoragePassthrough: LocalStorageService<string>
  ) {
    // super(_httpPassthrough, _errorHandlerPassthrough, _localStoragePassthrough);
    // this.init(apiRoutes.permissions, true);
  }


  get permissions$(): Observable<Permissions> {
    return this._entity$.map(json => {
      return json['Value']['Permissions'] as Permissions;
    });
  }

  public clearPermissions() {
    this._entity$.next(null);
  }
}
