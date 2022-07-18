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
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.invalid) {
      console.log('form is invalid');
      return;
    }
    console.log(this.form.value);
    let email = `${this.form.value.email}@example.com`;
    let password = this.form.value.password;

    this.authService.login(email, password).subscribe(
      (data) => {
        console.log('Login sunccessfull');

        console.log(data);
        let username = data.email.split('@')[0];
        console.log(username);

        this.router.navigateByUrl('/profile');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
