import { Component } from '@angular/core';
import { delay, filter, map, Observable, Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent {
  items: string[] = [];
  name: string = '';
  cutOff = 0;

  counter = this.dataService.counter;

  counter$: Observable<number> = this.dataService.counter$.pipe(
    //delay(2000)
    // map(val => val / 2),
    filter((val) => val > this.cutOff)
  );

  subs = new Subscription();
  foo() {
    this.subs.add(
      this.dataService.myMethod().subscribe((arg) => (this.counter = arg))
    );
  }

  constructor(private dataService: DataService) {}

  addItem(name: string) {
    this.dataService.addData(name);
    this.counter = this.dataService.counter;
    this.foo();
  }

  ngOnInit() {
    this.items = this.dataService.getData();
    this.counter = this.dataService.counter;
  }
}
