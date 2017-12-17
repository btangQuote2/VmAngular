import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Containers
import { JobRecordHireComponent } from "./jobrecordhire.component";

// Routes
export const ROUTES: Routes = [
  {
    path: '',
  	data: {
        title: 'Job Record Hire page',
        urls: [{title: 'Acceleration | VMS Dashboard', url: '/'},{title: 'Module'},{title: 'Job Record Hire page'}]
      },
  	component: JobRecordHireComponent
  }
];

@NgModule({
  declarations: [ JobRecordHireComponent ],
  imports: [ RouterModule.forChild(ROUTES) ]
})

export class JobRecordHireModule {}
