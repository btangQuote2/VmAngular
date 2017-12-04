import { Component, OnInit } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user: any;

constructor(
private router: Router) { }

  ngOnInit() {

}

onLogoutClick() {
console.log('This will be where you connect to your authorization service');
}

}
