import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AnonymousService {
  constructor(private http: HttpClient) {}

  sendAnonymous(data: any) {
    return this.http.post(
      'https://anonymous-f4d10-default-rtdb.firebaseio.com/messages.json',
      data
    );
  }

  getMessage() {
    return this.http
      .get<any>(
        'https://anonymous-f4d10-default-rtdb.firebaseio.com/messages.json'
      )
      .pipe(
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
