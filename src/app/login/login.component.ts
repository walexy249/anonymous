import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as buttonConfig from './../shared/button-config';
import { MatProgressButtonOptions } from 'mat-progress-buttons';

import { AuthenticationService } from '../Service/authentication.service';

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loading = false;
  spinnerButtonOptions: MatProgressButtonOptions = {
    ...buttonConfig.spinnerButtonOptions,
    text: 'Login',
  };
  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
  });
  matcher = new MyErrorStateMatcher();

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.invalid) {
      console.log('form is invalid');
      return;
    }

    this.loading = true;
    console.log(this.form.value);
    let email = `${this.form.value.email}@example.com`;
    let password = this.form.value.password;
    this.spinnerButtonOptions = {
      ...this.spinnerButtonOptions,
      active: true,
    };

    this.authService.login(email, password).subscribe(
      (data) => {
        this.loading = false;

        console.log(data);
        let username = data.email.split('@')[0];
        console.log(username);
        this.spinnerButtonOptions = {
          ...this.spinnerButtonOptions,
          active: false,
        };
        this.toastr.success('Login successfull');

        this.router.navigateByUrl('/profile');
      },
      (error) => {
        this.spinnerButtonOptions = {
          ...this.spinnerButtonOptions,
          active: false,
        };
        this.loading = false;
        console.log(error);
        const code = error.error.error.message;

        let message = 'Error loggin in';
        if (code === 'EMAIL_NOT_FOUND') {
          message = 'Invalid username';
        } else if (code === 'INVALID_PASSWORD') {
          message = 'Invalid password';
        }
        this.toastr.error(message);
      }
    );
  }
}
