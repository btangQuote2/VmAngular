import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  // public
  public loading = false;
  public resetPasswordForm: FormGroup;
  public errorMessage = '';

  constructor(private _builder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  public submit(form) {}

  private createForm() {
    this.resetPasswordForm = this._builder.group({
      email: ['', Validators.required]
    });
  }
}
