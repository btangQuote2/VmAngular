import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Containers
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

// Services
import {ScriptService} from '../../shared/services/script.service';
import { HomeModule } from '../home.module';
// Routes//
export const ROUTES: Routes = [
  { path: '',
    data: {
        title: 'Dashboard page',
        urls: [{title: 'Acceleration | VMS Dashboard', url: '/dashboard/data'}, { title: 'Dashboard'}, { title: 'Dashboard page'}]
      },
    component: DashboardComponent,
      children:
      [
        { path: 'sidebar', loadChildren: './sidebar/sidebar.module#SidebarModule' },
        { path: 'data', loadChildren: './modules/data/data.module#DataModule' },
        { path: 'nodata', loadChildren: './modules/nodata/nodata.module#NoDataModule' },
        { path: 'list', loadChildren: './modules/list/list.module#ListModule' },
        { path: 'listnames', loadChildren: './modules/listnames/listnames.module#ListNamesModule' },
        { path: 'jobrecordhire', loadChildren: './modules/jobrecordhire/jobrecordhire.module#JobRecordHireModule' },
      ]
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
   SidebarComponent,
   HeaderComponent,
   FooterComponent
  ],
  imports: [ HomeModule, RouterModule.forChild(ROUTES) ],
  providers: [
    ScriptService, FlashMessagesService
  ]
})

export class DashboardModule {}
