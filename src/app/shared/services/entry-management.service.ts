import { ActivatedRoute, Router } from '@angular/router';
import { TenantConfigurationService } from './tenant/tenant-configuration.service';
import { UserConfigurationService } from './user/user-configuration.service';
import { Injectable } from '@angular/core';
import { HeaderUpdateService } from '../../home/header/header-update.service';
/*******************************************************************
 * Handles a user's entry into the Agile 1 system
 * Updates navigation for user
 * Where to redirect from login
 ******************************************************************/

@Injectable()
export class EntryManagementService {
  private _tenants: any[] = [];

  constructor(
    private _headerUpdate: HeaderUpdateService,
    private _userConfigurationService: UserConfigurationService,
    private _tenantConfigurationService: TenantConfigurationService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  /******************************************************************************************************************
   * Public Methods
   ******************************************************************************************************************/

  public navigateNext() {
    if (this._tenantConfigurationService.currentTenantId) {
      this.navigateWithTenant();
    } else {
      this._tenantConfigurationService.setupTenants().then(tenants => {
        // Keep a local copy
        this._tenants = tenants;

        // if there is only one tenant for this user, it will be automatically set. Let's check and redirect them in if so
        if (tenants.length === 1) {
          this.navigateWithTenant();
        } else {
          this.navigateWithoutTenant();
        }
      });
    }
  }

  public navigateHome() {
    this._userConfigurationService.homeRoute.then(path => {
      if (path.indexOf('agile1.com') > -1) {
        window.location.href = path;
      } else {
        this._router.navigate([path]);
      }
    });
  }

  public get canNavigateIn() {
    if (this.hasTenantInfo) {
      if (this.hasUserInfo) {
        this.setupUserNavbar();

        return true;
      }
    }

    return false;
  }

  public get hasTenantInfo(): boolean {
    return this._tenantConfigurationService.currentTenantId !== null;
  }

  public get tenants(): any[] {
    if (this._tenants.length === 0) {
      this._tenants = this._tenantConfigurationService.tenants;
    }

    return this._tenants;
  }

  public get hasUserInfo(): boolean {
    return this._userConfigurationService.currentUser !== null;
  }

  public get redirectTo(): string {
    this._route.queryParams
      .map(qp => qp['redirectTo'])

      .subscribe(
        redirectTo => {
          return redirectTo;
        },

        error => console.log(error)
      );

    return null;
  }

  public setupUserNavbar() {
    this._headerUpdate.triggerUpdate();
  }

  /******************************************************************************************************************
   * Private Methods
   ******************************************************************************************************************/
  private navigateWithTenant() {
    this.navigateIn();
  }

  private navigateWithoutTenant() {
    if (this.redirectTo) {
      this._router.navigate(['company'], {
        queryParams: { redirectTo: this.redirectTo }
      });
    } else {
      this._router.navigate(['company']);
    }
  }

  private navigateIn() {
    if (this.redirectTo) {
      this._router.navigate([this.redirectTo]);
    } else {
      this.navigateHome(); // ._router.navigate([this._userConfigurationService.homeRoute]);
    }
  }
}
