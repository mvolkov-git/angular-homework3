import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { DataComponent } from './components/data/data.component';
import { ExamComponent } from './components/exam/exam.component';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';

@NgModule({
  declarations: [AppComponent, DataComponent, ExamComponent, WeatherForecastComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule,HttpClientModule],
  providers: [DataService, HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
