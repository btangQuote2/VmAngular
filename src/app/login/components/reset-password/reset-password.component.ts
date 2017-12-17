import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
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
