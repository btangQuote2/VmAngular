import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// Containers
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  imports: [ HomeRoutingModule, CommonModule ],
  declarations: [HomeComponent, NavigationComponent]
})
export class HomeModule {}
