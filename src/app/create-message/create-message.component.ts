import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnonymousService } from '../Service/anonymous.service';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss'],
})
export class CreateMessageComponent implements OnInit {
  form: FormGroup;

  constructor(private anonymousService: AnonymousService) {
    this.form = new FormGroup({
      message: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.form.value);
    let form = {
      message: this.form.value.message,
      created_at: new Date(),
      username: 'walexy249',
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
}
