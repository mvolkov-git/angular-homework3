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

  counter = 0;
  myMethodTesterCounter = 0;

  counter$: Observable<number> = this.dataService.counter$.pipe(
    //delay(2000)
    // map(val => val / 2),
    filter((val) => val > this.cutOff)
  );

  subs = new Subscription();

  getData() {
    return this.dataService.getData();
  }

  constructor(private dataService: DataService) {}

  addItem(name: string) {
    this.dataService.addData(name);
    this.counter = this.dataService.counter;
    this.myMethodTesterCounter = this.dataService.myMethodTesterCounter;
  }

  ngOnInit() {
    this.items = this.dataService.getData();
    this.counter = this.dataService.counter;

    this.subs.add(
      this.dataService.myMethod().subscribe((arg) => {
        // alert(this.dataService.myMethodTesterCounter);
        console.log('myMethod called');
      })
    );
    // this.subs.add(
    //   this.counter$.subscribe((arg) => this.myMethodTesterCounter++)
    // );
  }
}
