import { Subject } from 'rxjs/Subject';
import { AuthenticationService } from './../shared/services/authentication/authentication.service';
import { LoginRoutes } from './../login/login-routing.module';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vms-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  getLogin = false;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private _router: Router,
    private _authService: AuthenticationService
  ) {}

  ngOnInit() {}


  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
