import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { DataComponent } from './components/data/data.component';
import { ExamComponent } from './components/exam/exam.component';

@NgModule({
  declarations: [AppComponent, DataComponent, ExamComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
