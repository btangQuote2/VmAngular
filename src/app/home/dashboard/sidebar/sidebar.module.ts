import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Containers
import { SidebarComponent } from './sidebar.component';

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
    component: SidebarComponent
  }
];

@NgModule({
  declarations: [SidebarComponent],
  imports: [RouterModule.forChild(ROUTES)]
})
export class SidebarModule {}
