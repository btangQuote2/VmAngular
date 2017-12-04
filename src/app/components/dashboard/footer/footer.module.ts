import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Containers
import { FooterComponent } from "./footer.component";

// Routes
export const ROUTES: Routes = [
  {
    path: '',
  	data: {
        title: 'Footer page',
        urls: [{title: 'Acceleration | VMS Dashboard', url: '/'},{title: 'Dashboard'},{title: 'Footer page'}]
      },
  	component: FooterComponent
  }
];

@NgModule({
  declarations: [ FooterComponent ],
  imports: [ RouterModule.forChild(ROUTES) ]
})

export class FooterModule {}
