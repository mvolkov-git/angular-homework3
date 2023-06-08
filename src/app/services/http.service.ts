import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, share } from 'rxjs';
import { User } from '../user';

type Post = {
  body: string;
  title: string
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  json$ = this.http.get<Post>('https://jsonplaceholder.typicode.com/posts/2').pipe(
    map(val => ({title: val.title, body: val.body})),
    share()
);

  getData(){
    return this.http.get('assets/user.json')
  }

  getUsers() : Observable<User[]> {
    return this.http.get('assets/users.json').pipe(map((data:any)=>{
        let usersList = data["userList"];
        return usersList.map(function(user: any): User {
            return new User(user.userName, user.userAge);
          });
    }));
}
}
