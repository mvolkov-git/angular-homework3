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
  a = 0;
  counter$: Observable<number> | undefined;
  myMethodTesterCounter = 0;

  subs = new Subscription();

  getData() {
    return this.dataService.getData();
  }

   constructor(private dataService: DataService) {}

  addItem(name: string) {
    this.dataService.addData(name);
    this.counter = this.dataService.counter * 10;
    this.myMethodTesterCounter = this.dataService.myMethodTesterCounter;

    if (this.dataService.counter >= 7) {
      this.subs.unsubscribe();
    }
  }

  ngOnInit() {
    this.items = this.dataService.getData();
    this.counter = this.dataService.counter;
    this.counter$ = this.dataService.counter$.pipe(
      delay(1000),
      //  map(val => val / 2),
      filter((val) => val > this.cutOff),
    );

    this.subs.add(
      this.dataService.myMethod().subscribe((data) => {
        // alert(this.dataService.myMethodTesterCounter);
        console.log('myMethod called ' +  this.myMethodTesterCounter + ' ' + data);
      })
    );
  }
}
