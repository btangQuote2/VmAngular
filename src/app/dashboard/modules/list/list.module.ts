import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Containers
import { ListComponent } from "./list.component";

// Routes
export const ROUTES: Routes = [
  {
    path: '',
  	data: {
        title: 'List page',
        urls: [{title: 'Acceleration | VMS Dashboard', url: '/'},{title: 'Module'},{title: 'List page'}]
      },
  	component: ListComponent
  }
];

@NgModule({
  declarations: [ ListComponent ],
  imports: [ RouterModule.forChild(ROUTES) ]
})

export class ListModule {}
