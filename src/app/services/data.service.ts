import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data: string[] = ['Apple iPhone XR', 'Samsung Galaxy S9', 'Nokia 9'];

  counter = this.data.length;
  private counterSubject = new BehaviorSubject<number>(this.counter);

  get counter$(): Observable<number> {
    return this.counterSubject.asObservable();
  }

  myMethod() : Observable<number> {
    this.counter = 12345;
    this.counterSubject.next(this.counter);
    return this.counter$;
  }

  getData(): string[] {
    return this.data;
  }
  addData(name: string) {
    this.data.push(name);
    this.counter = this.data.length;
    this.counterSubject.next(this.counter);
  }

  // doNext()
  // {
  //   this.counter = this.data.length;
  //   this.counterSubject.next(this.counter);
  // }
}
