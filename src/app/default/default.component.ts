import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { AuthenticationService } from '../Service/authentication.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  user!: User;
  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.user = user;
      // console.log(user);
    });
  }

  onLogout() {
    this.authService.logout();
    // this.router.navigateByUrl('/auth');
  }
}
