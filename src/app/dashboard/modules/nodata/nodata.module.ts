import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Containers
import { NoDataComponent } from "./nodata.component";

// Routes
export const ROUTES: Routes = [
  {
    path: '',
  	data: {
        title: 'No Data page',
        urls: [{title: 'Acceleration | VMS Dashboard', url: '/'},{title: 'Module'},{title: 'No Data page'}]
      },
  	component: NoDataComponent
  }
];

@NgModule({
  declarations: [ NoDataComponent ],
  imports: [ RouterModule.forChild(ROUTES) ]
})

export class NoDataModule {}
