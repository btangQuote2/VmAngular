import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';

// import { apiRoutes } from '../../../configuration/api-routes.configuration';
// import { BaseStore } from '../../../../shared/services/base-store.service';
// import {User} from '../../../../models/domain/User';
import { Observable } from 'rxjs/Observable';
// import {NetworkErrorHandler} from '../../../../shared/services/network-error-handler';
import { LocalStorageService } from '../local-storage.service';
import { User } from '../../../models/domain/User';
import { NetworkErrorHandler } from '../network-error-handler';
import { apiRoutes } from '../../configurations/api-routes.configuration';
@Injectable() // extends BaseStore
export class UserService {
  constructor(
    protected _httpPassthrough: Http,
    protected _errorHandlerPassthrough: NetworkErrorHandler,
    protected _localStoragePassthrough: LocalStorageService<string>
  ) {
    // super(_httpPassthrough, _errorHandlerPassthrough);
    // this.init(apiRoutes.currentUser);
  }

  get currentUserInfo$(): Observable<User> {
    // TODO: Change how service is provided so the init call can be moved to the constructor.
    // Currently provided in App, but the Token isn't set so the init fould fail and produce an empty entity$

    //    return this._entity$.asObservable() as Observable<User>;

    return null;
  }

  getLatest(): Promise<User> {
   // return this.load();
   return null;
  }
}
