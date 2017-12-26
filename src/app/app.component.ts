import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import {
  NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    '../assets/css/vendor/perfect-scrollbar.min.css',
    '../assets/css/vendor/slick.css',
    '../assets/css/vendor/slick-theme.css',
    '../assets/css/bootstrap.css',
    '../assets/css/styles.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'app';

  color = 'primary';
  mode = 'determinate';
  value = 50;

  route: string;
  bodyRef: string;

  constructor(
    public progressService: NgProgress,
    private location: Location,
    private router: Router,
    private http: HttpClient
  ) {
    // Load Body Class Element for each Page
    router.events.subscribe(val => {
      if (location.path() !== '') {
        this.route = location.path();
        if (this.route === '/home') {
          this.bodyRef = 'avms-index';
        } else if (
          this.route === '/roleselect' ||
          this.route === '/register' ||
          this.route === '/loginuser' ||
          this.route === '/invalidinput' ||
          this.route === '/forgotusrname' ||
          this.route === '/forgotusrnmresp' ||
          this.route === '/forgotpw' ||
          this.route === '/forgotpwresp' ||
          this.route === '/secquestions' ||
          this.route === '/initlogin'
        ) {
          this.bodyRef = 'page-login';
        } else if (
          this.route === '/dashboard/data' ||
          this.route === '/dashboard/nodata'
        ) {
          this.bodyRef = 'page-dashboard nav-bar-expanded';
        } else if (
          this.route === '/dashboard/list' ||
          this.route === '/dashboard/listnames'
        ) {
          this.bodyRef = 'page-lists';
        } else if (this.route === '/dashboard/jobrecordhire') {
          this.bodyRef = 'page-job-record';
        } else if (this.route === '/gridlayout') {
          this.bodyRef = 'page-grid-example';
        } else {
          this.bodyRef = 'page-login';
        }
      } else {
        this.route = '/home';
      }
    });
  }

  ngOnInit() {}
}
