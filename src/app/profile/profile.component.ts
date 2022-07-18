import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { AuthenticationService } from '../Service/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user!: User;
  username!: string;
  url = window.location.origin;
  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    // console.log();

    console.log(location.protocol + '//' + location.host);
    console.log(window.location.origin);

    this.authService.user.subscribe((user) => {
      // console.log('user', user);
      this.user = user;
      this.username = this.user?.email.split('@')[0];
    });
  }
}
