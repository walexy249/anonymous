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
  profileLink!: string;
  profileLinkWhatsapp!: string;
  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    console.log(this.url);

    console.log(window.location.origin);

    this.authService.user.subscribe((user) => {
      // console.log('user', user);
      this.user = user;
      this.username = this.user?.email.split('@')[0];
      this.profileLink = `${this.url}/${this.username}`;
      this.profileLinkWhatsapp =
        `Write a secret anonymous message for me.. 😉 I won't know who wrote it.. 😂❤ 👉` +
        this.profileLink;
    });
  }

  onClick() {
    window.open(
      'whatsapp://send?text=' + this.profileLinkWhatsapp,

      // This is what makes it
      // open in a new window.
      '_blank'
    );
  }
}
