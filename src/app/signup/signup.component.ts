import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import * as buttonConfig from './../shared/button-config';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { AuthenticationService } from '../Service/authentication.service';
import { Router } from '@angular/router';

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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  hide = true;
  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
  });
  spinnerButtonOptions: MatProgressButtonOptions = {
    ...buttonConfig.spinnerButtonOptions,
    text: 'Submit',
  };
  matcher = new MyErrorStateMatcher();

  constructor(
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.invalid) {
      console.log('form is invalid');
      return;
    }
    this.spinnerButtonOptions = {
      ...this.spinnerButtonOptions,
      active: true,
    };
    console.log(this.form.value);
    let email = `${this.form.value.email}@example.com`;
    let password = this.form.value.password;

    this.authService.signup(email, password).subscribe(
      (data) => {
        console.log(data);
        let username = data.email.split('@')[0];
        console.log(username);
        this.spinnerButtonOptions = {
          ...this.spinnerButtonOptions,
          active: false,
        };
        this.toastr.success('Signup successfull');

        this.router.navigateByUrl('/profile');
      },
      (error) => {
        this.spinnerButtonOptions = {
          ...this.spinnerButtonOptions,
          active: false,
        };
        console.log(error);
        const code = error.error.error.message;

        let message = 'Error signin up';
        if (code === 'EMAIL_EXISTS') {
          message = 'This username already exists';
        }
        // else if (code === 'EMAIL_NOT_FOUND') {
        //   message = 'Invalid username';
        // } else if (code === 'INVALID_PASSWORD') {
        //   message = 'Invalid password';
        // }
        this.toastr.error(message);
      }
    );
  }
}
