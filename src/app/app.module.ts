import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {PreloadAllModules,  RouterModule,  Routes} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgProgressModule, NgProgressBrowserXhr } from 'ngx-progressbar';
import { BrowserXhr } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ScriptService } from './shared/services/script.service';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';

// Routes
 export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadChildren: './components/home/home.module#HomeModule'
  },
//   {
//     path: 'roleselect',
//     loadChildren: './components/login/roleselect/roleselect.module#RoleSelectModule'
//   },
//   {
//     path: 'register',
//     loadChildren: './components/login/register/register.module#RegisterModule'
//   },
//   {
//     path: 'loginuser',
//     loadChildren: './components/login/loginuser/loginuser.module#LoginUserModule'
//   },
//   {
//     path: 'invalidinput',
//     loadChildren: './components/login/invalidinput/invalidinput.module#InvalidInputModule'
//   },
//   {
//     path: 'forgotusrname',
//     loadChildren: './components/login/forgotusrname/forgotusrname.module#ForgotUNModule'
//   },
//   {
//     path: 'forgotusrnmresp',
//     loadChildren: './components/login/forgotusrnmresp/forgotusrnmresp.module#ForgotUNRespModule'
//   },
//   {
//     path: 'forgotpw',
//     loadChildren: './components/login/forgotpw/forgotpw.module#LoginFPWModule'
//   },
//   {
//     path: 'forgotpwresp',
//     loadChildren: './components/login/forgotpwresp/forgotpwresp.module#ForgotPWRespModule'
//   },
//   {
//     path: 'secquestions',
//     loadChildren: './components/login/secquestions/secquestions.module#SecurityQNModule'
//   },
//   {
//     path: 'initlogin',
//     loadChildren: './components/login/initlogin/initlogin.module#InitialLoginModule'
//   },
   {
      path: 'dashboard',
    //  component: DashboardComponent,
    //  pathMatch: 'full'
     loadChildren: './components/dashboard/dashboard.module#DashboardModule'
   }
//   {
//     path: 'gridlayout',
//     loadChildren: './components/gridlayout/gridlayout.module#GridLayoutModule'
//   }
//   // ,
//   // { path: '**', component: PageNotFoundComponent }
 ];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlashMessagesModule,
    NgProgressModule
     ,
    RouterModule.forRoot(ROUTES)
  ],
  exports: [
    NgProgressModule
  ],
  providers: [
    ScriptService,
    FlashMessagesService,
    {provide: BrowserXhr, useClass: NgProgressBrowserXhr}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
