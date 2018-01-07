import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Containers
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

// Services
import { ScriptService } from '../../shared/services/script.service';
import { HomeModule } from '../home.module';
import { HomeRoutingModule } from '../home-routing.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { JobsComponent } from './jobs/jobs.component';
import { ProjectsComponent } from './projects/projects.component';



@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    JobsComponent,
    ProjectsComponent
  ],
  imports: [HomeModule, DashboardRoutingModule],
  providers: [ScriptService, FlashMessagesService]
})
export class DashboardModule {}
