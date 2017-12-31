import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-vms-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor( private _router: Router,
    private _authService: AuthenticationService) { }

  ngOnInit() {
  }


  Logout() {
    this._authService.logout();
    this._router.navigate(['../login']);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
