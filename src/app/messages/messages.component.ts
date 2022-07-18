import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { AnonymousService } from '../Service/anonymous.service';
import { AuthenticationService } from '../Service/authentication.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  messages: {
    id: string;
    message: string;
    username: string;
    created_at: Date;
  }[] = [];
  username!: string;
  constructor(
    private anonymousService: AnonymousService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    // this.getMessage();
    this.authService.user.subscribe((user: User) => {
      this.username = user.email.split('@')[0];
      // console.log(this.username);
      this.getMessage();
    });
  }

  getMessage() {
    this.anonymousService.getMessage(this.username).subscribe(
      (data) => {
        console.log(data);
        this.messages = data.reverse();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
