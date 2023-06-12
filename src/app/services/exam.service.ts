import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

enum questionStatuses {
  new = 0,
  selected = 1,
  correct = 2,
  wrong = 3,
}

type questionType = {
  content: string;
  status: questionStatuses;
  correctAnswer: number;
  studentAnswer?: number;
};

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  term1: number[] = this.fillTerm();
  term2: number[] = this.fillTerm();

  quesions: questionType[] = [
    { content: `${this.term1[0]} + ${this.term2[0]}`, status: questionStatuses.new, correctAnswer: this.term1[0] + this.term2[0] },
    { content: `${this.term1[1]} + ${this.term2[1]}`, status: questionStatuses.new, correctAnswer: this.term1[1] + this.term2[1] },
    { content: `${this.term1[2]} + ${this.term2[2]}`, status: questionStatuses.new, correctAnswer: this.term1[2] + this.term2[2] },
    { content: `${this.term1[3]} + ${this.term2[3]}`, status: questionStatuses.new, correctAnswer: this.term1[3] + this.term2[3] },
    { content: `${this.term1[4]} + ${this.term2[4]}`, status: questionStatuses.new, correctAnswer: this.term1[4] + this.term2[4] },
  ];



  private counterSubject = new BehaviorSubject<questionType[]>(this.quesions);

   fillTerm() {
    let arr = Array(5) // array size is 5
      .fill(undefined)
      .map(() => Math.floor(50 * Math.random())); // numbers from 0-50 (exclusive)
    return arr;
  }

  get quesions$(): Observable<questionType[]> {
    return this.counterSubject.asObservable();
}
  constructor() { }

  ngOnInit() {

  }
}
