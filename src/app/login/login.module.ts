import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import {
  LoginRoutesModule,
  routedLoginComponents
} from './login-routes.module';
import { ResetPasswordService } from './components/reset-password/reset-password.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // ShareModule,
    MatInputModule,
    MatProgressSpinnerModule,
    LoginRoutesModule
  ],
  declarations: [routedLoginComponents],
  providers: [ResetPasswordService]
})
export class LoginModule {}
