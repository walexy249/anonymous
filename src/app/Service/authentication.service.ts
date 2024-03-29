import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { BehaviorSubject, from, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { User } from '../model/user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _user = new BehaviorSubject<any>(null);
  private activeLogoutTimer: any;
  constructor(private http: HttpClient) {}

  // signup(email: string, password: string) {
  //   return this.http.post(
  //     `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`,
  //     {
  //       email,
  //       password,
  //       returnSecureToken: true,
  //     }
  //   );
  // }

  ngOnDestroy() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
  }

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (!user) {
          return false;
        }
        return !!user.token;
      })
    );
  }
  get userId() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (!user) {
          return null;
        }
        return user.id;
      })
    );
  }

  get token() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (!user) {
          return null;
        }
        return user.token;
      })
    );
  }

  get user() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (!user) {
          return null;
        }
        return user;
      })
    );
  }

  autoLogin() {
    return of(localStorage.getItem('authData')).pipe(
      map((storedData: any) => {
        // console.log(storedData);

        if (!storedData) {
          return null;
        }
        // console.log('storeddata', localStorage.getItem('authData'));

        const parsedData = JSON.parse(storedData) as {
          token: string;
          tokenExpirationDate: string;
          userId: string;
          email: string;
        };
        const expirationTime = new Date(parsedData.tokenExpirationDate);
        if (expirationTime <= new Date()) {
          return null;
        }
        const user = new User(
          parsedData.userId,
          parsedData.email,
          parsedData.token,
          expirationTime
        );
        return user;
      }),
      tap((user) => {
        if (user) {
          this._user.next(user);
          this.autoLogout(user.tokenDuration);
        }
      }),
      map((user) => !!user)
    );
  }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(tap(this.setUserData.bind(this)));
  }

  login(email: string, password: string) {
    // this._userIsAuthenticated = true;
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`,
        { email, password, returnSecureToken: true }
      )
      .pipe(tap(this.setUserData.bind(this)));
  }
  async logout() {
    this._user.next(null);
    localStorage.removeItem('authData');
  }

  private autoLogout(duration: number) {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this.activeLogoutTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  private setUserData(userData: AuthResponseData) {
    const expirationTime = new Date(
      new Date().getTime() + +userData.expiresIn * 1000
    );
    const user = new User(
      userData.localId,
      userData.email,
      userData.idToken,
      expirationTime
    );
    this._user.next(user);
    this.stroreAuthData(
      userData.localId,
      userData.idToken,
      expirationTime.toISOString(),
      userData.email
    );
    this.autoLogout(user.tokenDuration);
  }

  private async stroreAuthData(
    userId: string,
    token: string,
    tokenExpirationDate: string,
    email: string
  ) {
    const data = JSON.stringify({ userId, token, tokenExpirationDate, email });
    localStorage.setItem('authData', data);
  }
}
