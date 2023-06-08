import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  user: User | undefined;
// get users$(): Observable<User[]> {
//   return
// }

  private data: string[] = ['Apple iPhone XR', 'Samsung Galaxy S9', 'Nokia 9'];

  myMethodTesterCounter = 0;

  counter = this.data.length;
  private counterSubject = new BehaviorSubject<number>(this.counter);

  get counter$(): Observable<number> {
    return this.counterSubject.asObservable();
  }

  myMethod()  {
    // this.data.push("name");
    // this.counter = this.data.length;
    //this.counterSubject.next(this.counter);
    this.myMethodTesterCounter++;
    return this.counter$;
  }

  getData(): string[] {
    return this.data;
  }

  addData(name: string) {
    this.data.push(name);
    this.counter = this.data.length;
    this.counterSubject.next(this.counter);
    this.myMethodTesterCounter++;
  }

  // doNext()
  // {
  //   this.counter = this.data.length;
  //   this.counterSubject.next(this.counter);
  // }
}
