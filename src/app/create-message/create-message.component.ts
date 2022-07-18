import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as buttonConfig from './../shared/button-config';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { AnonymousService } from '../Service/anonymous.service';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss'],
})
export class CreateMessageComponent implements OnInit {
  form: FormGroup;
  private routeSub!: Subscription;
  username!: string;
  spinnerButtonOptions: MatProgressButtonOptions = {
    ...buttonConfig.spinnerButtonOptions,
    text: 'Send message',
  };
  constructor(
    private anonymousService: AnonymousService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = new FormGroup({
      message: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      console.log(params); //log the entire params object
      console.log(params['id']); //log the value of id
      this.username = params['id'];
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    let form = {
      message: this.form.value.message,
      created_at: new Date(),
      username: this.username,
    };
    this.spinnerButtonOptions = {
      ...this.spinnerButtonOptions,
      active: true,
    };
    this.anonymousService.sendAnonymous(form).subscribe(
      (data) => {
        console.log('message sent successfully');
        console.log(data);
        this.spinnerButtonOptions = {
          ...this.spinnerButtonOptions,
          active: false,
        };
        this.toastr.success('Message sent successfull.');
        setTimeout(() => {
          this.toastr.info(
            "Now it's your turn to create an account and dare your friends to tell you what they think about you!"
          );
          this.router.navigateByUrl('/signup');
        }, 3000);
      },
      (error) => {
        console.log('error', error);
        this.spinnerButtonOptions = {
          ...this.spinnerButtonOptions,
          active: false,
        };
        this.toastr.error('Error sending message.please try again');
      }
    );
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
