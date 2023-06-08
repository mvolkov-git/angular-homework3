import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'HomeWork3';

  json$ = this.httpService.json$;

  users: User[] = [];
  user: User | undefined;



  constructor(private httpService: HttpService) {
    // this.user = new User('bbb', 25);
  }

  ngOnInit() {
    //this.users = this.httpService.getUsers();

    //  this.user = new User('aaa', 23);
    // this.http.get('assets/user.json').subscribe({next: data:any) => this.user = new User(data.name, data.age)});
    // this.http.get('assets/user.json').subscribe({next:(data:any) => this.user = new User(data.name, data.age)});
    // this.httpService.getUsers().subscribe({next:(data: User[]) => this.users=data});
    this.httpService.getUsers().subscribe({next:(data: User[]) => this.users.push(new User("eee", 45))});

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
