import { AuthorizationService } from './../shared/services/authorization/authorization.service';
import { LoginFieldsComponent } from './components/login-fields.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import {
  LoginRoutingModule,
  routedLoginComponents
} from './login-routing.module';
import { ResetPasswordService } from './components/reset-password/reset-password.service';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MatInputModule,
    MatProgressSpinnerModule,
    LoginRoutingModule
  ],
  declarations: [routedLoginComponents],
  providers: [ResetPasswordService, AuthorizationService]
})
export class LoginModule {}
