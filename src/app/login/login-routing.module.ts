import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginFieldsComponent } from './components/login-fields.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

export const LoginRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginFieldsComponent },
//  { path: 'reset-password', component: ResetPasswordComponent },
//  { path: 'forgot-password', component: ForgotPasswordComponent },
];

export const LoginRoutingModule = RouterModule.forChild(LoginRoutes);
export const routedLoginComponents = [
  LoginComponent,
  LoginFieldsComponent,
  ResetPasswordComponent,
  ForgotPasswordComponent
];
