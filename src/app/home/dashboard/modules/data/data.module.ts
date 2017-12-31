import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Containers
import { DataComponent } from "./data.component";

// Routes
export const ROUTES: Routes = [
  {
    path: '',
  	data: {
        title: 'Dashboard Data page',
        urls: [{title: 'Acceleration | VMS Dashboard', url: '/'},{title: 'Modules'},{title: 'Dashboard Data page'}]
      },
  	component: DataComponent
  }
];

@NgModule({
  declarations: [ DataComponent ],
  imports: [ RouterModule.forChild(ROUTES) ]
})

export class DataModule {}
