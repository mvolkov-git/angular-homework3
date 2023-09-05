import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent {
  public forecasts$: Observable<WeatherForecast[]> = new Observable<WeatherForecast[]>;

  constructor(http: HttpClient) {

    // http.get<WeatherForecast[]>('http://localhost:5178/WeatherForecast').subscribe(result => {
    //   this.forecasts = result;
    // }, error => console.error(error));

    this.forecasts$.subscribe({
      next: (data: WeatherForecast[]) => http.get<WeatherForecast[]>('http://localhost:5178/WeatherForecast'),
      error: (err: Error) => console.error('Observer got an error: ' + err),
      // complete: () => console.log('Observer got a complete notification'),
    });

    this.forecasts$ = http.get<WeatherForecast[]>('http://localhost:5178/WeatherForecast');
  }

  title = 'angularapp';
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
