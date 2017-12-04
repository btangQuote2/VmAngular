import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Containers
import { ListNamesComponent } from "./listnames.component";

// Routes
export const ROUTES: Routes = [
  {
    path: '',
  	data: {
        title: 'List Names page',
        urls: [{title: 'Acceleration | VMS Dashboard', url: '/'},{title: 'Module'},{title: 'ListNames page'}]
      },
  	component: ListNamesComponent
  }
];

@NgModule({
  declarations: [ ListNamesComponent ],
  imports: [ RouterModule.forChild(ROUTES) ]
})

export class ListNamesModule {}
