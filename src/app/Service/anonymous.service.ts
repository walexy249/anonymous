import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap, take } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AnonymousService {
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  sendAnonymous(data: any) {
    return this.http.post(
      'https://anonymous-f4d10-default-rtdb.firebaseio.com/messages.json',
      data
    );
  }

  getMessage(username: string) {
    // console.log(username);
    let fetchedToken;
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        fetchedToken = token;
        return this.http.get<any>(
          `https://anonymous-f4d10-default-rtdb.firebaseio.com/messages.json?orderBy="username"&equalTo="${username}"&auth=${fetchedToken}"`
        );
      }),
      map((res) => {
        let arr = [];
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            arr.push({
              id: key,
              message: res[key].message,
              username: res[key].username,
              created_at: res[key].created_at,
            });
          }
        }
        return arr;
      })
    );
  }
}
