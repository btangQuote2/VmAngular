import { LocalStorageService } from '../../services/local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { localStorageKeys } from '../../configurations/local-storage-keys';

@Injectable()
export class TenantConfigurationService implements OnInit, OnDestroy {
  private _tenants: any[];
  public hasMultipleTenants = false;

  constructor(private _localStorageService: LocalStorageService<string>) {}

  ngOnInit() {}

  ngOnDestroy() {}

  /******************************************************************************************************************
     * Public Methods
     ******************************************************************************************************************/

    public setupTenants(): Promise<any[]> {

      // return this._companyService.getLatest()
      // .then ((tenants) => {

      //     this._tenants = tenants;

      //     this.hasMultipleTenants = (tenants.length > 1);

      //     if (tenants.length === 1) {

      //         this.currentTenantId = tenants[0].Id;
      //     }

      //     return tenants;
      // });
      return null;
  }


  public set currentTenantId(tenantId: string) {
    this._localStorageService.setString(localStorageKeys.tenantId, tenantId);
  }


  public get currentTenantId() {
    return this._localStorageService.getString(localStorageKeys.tenantId);
  }

  public get tenants(): any[] {
    if (!this._tenants) {
      // this._companyService.getLatest().then(tenants => {
      //   this._tenants = tenants;
      // });

      return this._tenants;
    }

    /******************************************************************************************************************
     * Private Methods
     ******************************************************************************************************************/
  }
}
