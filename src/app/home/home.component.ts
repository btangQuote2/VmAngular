import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  getLogin = false;

  constructor(
  private router: Router) { }

    ngOnInit() {

    }

    onLogoutClick() {
      console.log('Log user out module');
  }

}
