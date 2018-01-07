import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';
// Routes//
export const ROUTES: Routes = [
  {
    path: '',
    data: {
      title: 'Dashboard page',
      urls: [
        { title: 'Acceleration | VMS Dashboard', url: '/dashboard/data' },
        { title: 'Dashboard' },
        { title: 'Dashboard page' }
      ]
    },
    component: DashboardComponent,
    children: [
      { path: 'data', loadChildren: './modules/data/data.module#DataModule' },
      {
        path: 'nodata',
        loadChildren: './modules/nodata/nodata.module#NoDataModule'
      },
      { path: 'list', loadChildren: './modules/list/list.module#ListModule' },
      {
        path: 'listnames',
        loadChildren: './modules/listnames/listnames.module#ListNamesModule'
      },
      {
        path: 'jobrecordhire',
        loadChildren:
          './modules/jobrecordhire/jobrecordhire.module#JobRecordHireModule'
      }
    ]
  }
];

export const DashboardRoutingModule = RouterModule.forChild(ROUTES);
