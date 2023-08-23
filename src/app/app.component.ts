import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './common/user';
import { HttpService } from './services/http.service';
import { Observable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'HomeWork3';

  json$ = this.httpService.json$;

  test$ = this.httpService.test$;

  users: User[] = [];
  user: User;

  constructor(private httpService: HttpService, http: HttpClient) {
    this.user = new User('bbb', 25);

    // http.get<User[]>('/weatherforecast').subscribe(
    //   (result) => {
    //     this.users = result;
    //   },
    //   (error) => console.error(error)
    // );
  }

  ngOnInit() {
    interval(1000).subscribe(x=>console.log(x))

    this.user = new User('aa3a', 23);
    this.users.push(new User('vbvnb', 234));
    this.users.push(new User('v44nb', 34));
    // this.http.get('assets/user.json').subscribe({next: data:any) => this.user = new User(data.name, data.age)});
    // this.http.get('assets/user.json').subscribe({next:(data:any) => this.user = new User(data.name, data.age)});
    // this.httpService.getUsers().subscribe({next:(data: User[]) => this.users=data});
    this.httpService.getUsers().subscribe({
      next: (data: User[]) => this.users.push(new User('eee', 45)),
    });
    this.test$ = this.httpService.test$;
    console.log('qwXXn eqe');

    // this.httpService.getData().subscribe({
    //   next: (data: any) => {
    //     if (this.user === undefined) {
    //       ('undefined');
    //     } else {
    //       this.user.name + this.user.age;
    //     }
    //   },
    // });
    //this.httpService.getData().subscribe({next:(data:any) => this.user = new User('aaa', 23)});
  }
}
