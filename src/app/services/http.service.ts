import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, share } from 'rxjs';
import { User } from '../common/user';

type Post = {
  body: string;
  title: string;
};

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  urlPost: string = 'https://jsonplaceholder.typicode.com/posts/2';
  companyPost: string = 'https://localhost:7116/managementapi/companies/test';

  json$ = this.http.get<Post>(this.urlPost).pipe(
    map(val => ({title: val.title, body: val.body})),
    share()
  );

  // json$ = this.http.get(this.urlPost);

  public aa = this.http.get(this.urlPost);

  test$ = this.http.get<Post>(this.companyPost).pipe(
    map((val) => ({ title: val.title, body: val.body })),
    share()
  );

    // test$ = this.http.get(this.companyPost);

  getData() {
    return this.http.get('assets/user.json');
  }

  getUsers(): Observable<User[]> {
    return this.http.get('assets/users.json').pipe(
      map((data: any) => {
        let usersList = data['userList'];
        return usersList.map(function (user: any): User {
          return new User(user.userName, user.userAge);
        });
      })
    );
  }
}
