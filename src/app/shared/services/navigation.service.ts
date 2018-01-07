import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

import { BaseHttpService } from './base-http.service';
// import {apiRoutes} from '../../home/shared/configuration/api-routes.configuration';
import { environment } from '../../../environments/environment';
import { NetworkErrorHandler } from './network-error-handler';
// import {LocalStorageService} from '../../../home/shared/services/local-storage.service';
import { apiRoutes } from '../configurations/api-routes.configuration';
import { Navigation } from '../../models/domain/Navigtion';
import { LocalStorageService } from './local-storage.service';
@Injectable()
export class NavigationService extends BaseHttpService {
  protected entity$ = new Subject<Array<Navigation>>();

  constructor(
    protected _httpPassthrough: Http,
    protected _errorHandlerPassthrough: NetworkErrorHandler,
    protected _localStoragePassthrough: LocalStorageService<string>
  ) {
    super(_httpPassthrough, _errorHandlerPassthrough);
  }

  get navigation$() {
    return this.entity$.asObservable();
  }

  /******************************************************************************************************************
   * Public Methods
   ******************************************************************************************************************/
  async getLatest(): Promise<Navigation[]> {
    return this.load();
  }

  async getLinkByKey(key: string): Promise<string> {
    let link = '';

    await this.getLatest().then(async navigation => {
      navigation.forEach(menuItem => {
        if (menuItem['Key'] === key) {
          link = menuItem['Action'];
        }
      });
    });

    return link;
  }

  /******************************************************************************************************************
   * Private Methods
   ******************************************************************************************************************/
  private load(): Promise<Array<Navigation>> {
    const url = environment.apiUrl; // + apiRoutes.navigation;

    return new Promise((resolve, reject) => {
      this.get(url)
      .subscribe(
        // TODO: Look into function handlers here
        data => {
          // console.log('NotificationService load', data);
          this.entity$.next(this.castNavigation(data));
          resolve(this.castNavigation(data));
        },

        error => {
          reject(error);
        }
      );
    });
  }

  private castNavigation(jsonArray): Array<Navigation> {
    const navigationArray = [];

    _.forEach(jsonArray, (item: Navigation) => {
      navigationArray.push(new Navigation(item));
    });

    return navigationArray;
  }
}
