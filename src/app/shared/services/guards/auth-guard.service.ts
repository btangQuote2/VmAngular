import { Router, Route } from '@angular/router';
// import { AuthenticationService } from './../services/authentication/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad,  ActivatedRoute} from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { EntryManagementService } from '../entry-management.service';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router/src/router_state';


@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService,
    private _entryManagementService: EntryManagementService
  ) {}

  canLoad(route: Route): boolean {
    if (this._authenticationService.isLoggedIn()) {
      return true;
    }
    return false;
  }

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (this._authenticationService.isLoggedIn()) {

            // This will not work until the login page does not clear the session
            // Detect if the user is entring without a route, or entering the login page and redirect them home if logged in
            if ((state.url.indexOf('login') > -1 || state.url === '' || state.url === '/')) {

                this._entryManagementService.navigateNext();
            }

            return true;
        } else {

            this._router.navigate(['/login']);
            return false;
        }
    }
}
