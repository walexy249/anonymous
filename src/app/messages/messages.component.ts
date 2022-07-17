import { Component, OnInit } from '@angular/core';
import { AnonymousService } from '../Service/anonymous.service';

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
  constructor(private anonymousService: AnonymousService) {}

  ngOnInit(): void {
    this.getMessage();
  }

  getMessage() {
    this.anonymousService.getMessage().subscribe(
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
