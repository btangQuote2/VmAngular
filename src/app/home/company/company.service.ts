import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http } from '@angular/http';

// import { apiRoutes } from '../../shared/configuration/api-routes.configuration';
// import { BaseStore } from '../../shared/services/base-store.service';
import { Company } from '../../models/domain/Company';
import { NetworkErrorHandler } from '../../shared/services/network-error-handler';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { apiRoutes } from '../../shared/configurations/api-routes.configuration';

@Injectable()
export class CompanyService {
  protected _entity$ = new Subject<Company[]>();

  constructor(
    protected _httpPassthrough: Http,
    protected _errorHandlerPassthrough: NetworkErrorHandler,
    protected _localStoragePassthrough: LocalStorageService<string>
  ) {
    //  super(_httpPassthrough, _errorHandlerPassthrough, _localStoragePassthrough);
    //  this.init(apiRoutes.companyTenants);
  }

  public getLatest(): Promise<Company[]> {
    // return this.load().then(tenants => {
    //   return tenants['Value'] as Array<Company>;
    // });
    return null;
  }

  get companies$() {
    //  : Observable<Company[]>

    return this._entity$.map(companyList => {
      return companyList['Value'] as Array<Company>;
    });

    // return companies;
  }

  /******************************************************************************************************************
   * Private Methods
   ******************************************************************************************************************/
}
