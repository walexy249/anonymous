import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './Service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'anonymous';
  private authSub: Subscription = new Subscription();
  private previousAuthstate = false;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}
  ngOnInit() {
    this.authSub = this.authService.userIsAuthenticated.subscribe((isAuth) => {
      if (!isAuth && this.previousAuthstate === !isAuth) {
        this.router.navigateByUrl('/login');
      }
      this.previousAuthstate = isAuth;
      console.log('previosAuthstate', this.previousAuthstate);
    });
  }
  onLogout() {
    this.authService.logout();
    // this.router.navigateByUrl('/auth');
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}
