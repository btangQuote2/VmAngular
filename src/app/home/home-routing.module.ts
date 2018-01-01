import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

// Routes
export const ROUTES: Routes = [
  {
    path: '',
    data: {
      title: 'Home page',
      urls: [
        { title: 'Acceleration | VMS Dashboard', url: '/' },
        { title: 'Home' },
        { title: 'Home page' }
      ]
    },
    component: HomeComponent,

    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
       }
      //  ,
      // {
      //   path: 'sidebar',
      //   loadChildren: 'dashboard/sidebar/sidebar.module#SidebarModule'
      // }
    ]
  }
];
export const HomeRoutingModule = RouterModule.forChild(ROUTES);
