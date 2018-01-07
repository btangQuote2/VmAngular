import { Router, ActivatedRoute, Route } from '@angular/router';
import { AuthenticationService } from './../services/authentication/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router/src/interfaces';
import { EntryManagementService } from '../services/entry-management.service';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router/src/router_state';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private _router: Router,
      private _route: ActivatedRoute,
      private _authenticationService: AuthenticationService,
      private _entryManagementService: EntryManagementService
  ) {}

  canLoad (route: Route): boolean {

      // tslint:disable-next-line:curly
      if (this._authenticationService.isLoggedIn()) return true;

      return false;

  }

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

      if (this._authenticationService.isLoggedIn()) {

          // This will not work until the login page does not clear the session
          // Detect if the user is entring without a route, or entering the login page and redirect them home if logged in
          if (state.url.indexOf('company') === -1 && (state.url.indexOf('login') > -1 || state.url === '' || state.url === '/')) {

              this._entryManagementService.navigateNext();
          }

          return true;
      } else {

          this._router.navigate(['/login']);
          return false;
      }
  }
}

