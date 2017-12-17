import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Containers
import { HeaderComponent } from "./header.component";

// Routes
export const ROUTES: Routes = [
  {
    path: '',
  	data: {
        title: 'Header page',
        urls: [{title: 'Acceleration | VMS Dashboard', url: '/'},{title: 'Dashboard'},{title: 'Header page'}]
      },
  	component: HeaderComponent
  }
];

@NgModule({
  declarations: [ HeaderComponent ],
  imports: [ RouterModule.forChild(ROUTES) ]
})

export class HeaderModule {}
