import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { stringDistance } from 'codelyzer/util/utils';
import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute } from '@angular/router';

import { PermissionsService } from '../../services/authorization/permissions.service';
 import { NavigationService } from '../../services/navigation.service';
 import { Permissions } from '../../../models/domain/Permissions';
 import { User } from '../../../models/domain/User';
import { Promise } from 'core-js/library/web/timers';
import { Navigation } from '../../../models/domain/Navigtion';
import { NavigationLink } from '../../../models/NavigationLink';
import { UserService } from './user.service';

@Injectable()
export class UserConfigurationService implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  private _user: User;
  private _permissions: Permissions;
  private _navigation: Navigation[];

  private defaultUserHome = 'time/timesheets';

  constructor(
    private _permissionsService: PermissionsService,
    private _navigationService: NavigationService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.tearDownUser();
  }

  /******************************************************************************************************************
   * Public Methods
   ******************************************************************************************************************/

  public get navigation(): Promise<Navigation[]> {
    if (this._navigation) {
      return new Promise((resolve, reject) => {
        if (this._navigation) {
          resolve(this._navigation);
        }
      });
    } else {
      return this._navigationService.getLatest();
    }
  }

  public get permissions(): Promise<Permissions> {
    if (this._permissions) {
      return new Promise((resolve, reject) => {
        if (this._permissions) {
          resolve(this._permissions);
        }
      });
    } else {
  //    return this._permissionsService.getLatest();
    }
  }

  public get currentUser(): Promise<User> {
    if (this._user) {
      return new Promise((resolve, reject) => {
        if (this._user) {
          resolve(this._user);
        }
      });
    } else {
      return this._userService.getLatest().then(user => {
        return user['Value'][0];
      });
    }
  }

  public get homeRoute() {
    // return this._permissionsService.getLatest().then(permissions => {
    //   if (permissions.Projects.CanManage) {
    //     // Go to TP Project Management for all users with rights
    //     return this._navigationService.getLinkByKey('@prsel').then(link => {
    //       return link === '' ? this.defaultUserHome : link;
    //     });
    //   } else {
    //     return this.defaultUserHome;
    //   }
    // });
    return null;
  }

  /******************************************************************************************************************
   * Private Methods
   ******************************************************************************************************************/
  private tearDownUser() {
    this._permissionsService.clearPermissions();

    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
