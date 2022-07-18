import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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

  constructor(
    private anonymousService: AnonymousService,
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

    this.anonymousService.sendAnonymous(form).subscribe(
      (data) => {
        console.log('message sent successfully');
        console.log(data);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
