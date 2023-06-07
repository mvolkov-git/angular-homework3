import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent {
  items: string[] = [];
  name: string = '';

  counter = this.dataService.counter;

  constructor(private dataService: DataService) {}

  addItem(name: string) {
    this.dataService.addData(name);
    this.counter = this.dataService.counter;
  }

  ngOnInit() {
    this.items = this.dataService.getData();
    this.counter = this.dataService.counter;
  }
}
