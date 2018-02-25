import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidenavComponent } from './sidenav.component';

// Containers

// Routes
export const ROUTES: Routes = [
  {
    path: '',
    data: {
      title: 'Sidebar page',
      urls: [
        { title: 'Acceleration | VMS Dashboard', url: '/' },
        { title: 'Dashboard' },
        { title: 'Sidebar page' }
      ]
    },
    component: SidenavComponent
  }
];

@NgModule({
  declarations: [SidenavComponent],
  imports: [RouterModule.forChild(ROUTES)]
})
export class SidebarModule {}
