import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data: string[] = ['Apple iPhone XR', 'Samsung Galaxy S9', 'Nokia 9'];

  counter = this.data.length;

  getData(): string[] {
    return this.data;
  }
  addData(name: string) {
    this.data.push(name);
    this.counter = this.data.length;
  }
}
