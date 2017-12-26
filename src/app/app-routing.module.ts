import { LoginComponent } from './login/login.component';
import { RouterModule, Route, Routes } from '@angular/router';


// Routes
export const AppRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'login',
    component: LoginComponent
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
     loadChildren: './dashboard/dashboard.module#DashboardModule'
   }
//   {
//     path: 'gridlayout',
//     loadChildren: './components/gridlayout/gridlayout.module#GridLayoutModule'
//   }
//   // ,
//   // { path: '**', component: PageNotFoundComponent }
 ];

 export const AppRoutingModule = RouterModule.forRoot(AppRoutes, {useHash: true});
