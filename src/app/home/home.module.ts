import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// Containers
import { HomeComponent } from './home.component';

// Routes
export const ROUTES: Routes = [
  {
  path: '',
  data: {
        title: 'Home page',
        urls: [{title: 'Acceleration | VMS Dashboard', url: '/'}, { title: 'Home'}, { title: 'Home page'}]
      },
  component: HomeComponent
  }
];

@NgModule({
  declarations: [ HomeComponent ],
  imports: [ CommonModule, RouterModule.forChild(ROUTES) ]
})

export class HomeModule {}
