import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { questionStatuses, questionType } from 'src/app/common/exam';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  term1: number[] = this.fillTerm();
  term2: number[] = this.fillTerm();

  quesions: questionType[] = [];

  // answers: number[] = [];

  private questionSubject = new BehaviorSubject<questionType[]>(this.quesions);
  // private answerSubject = new BehaviorSubject<number[]>(this.answers);

  fillTerm() {
    let arr = Array(5) // array size is 5
      .fill(undefined)
      .map(() => Math.floor(50 * Math.random())); // numbers from 0-50 (exclusive)
    return arr;
  }

  get quesions$(): Observable<questionType[]> {
    return this.questionSubject.asObservable();
  }

  // get answers$(): Observable<number[]> {
  //   return this.answerSubject.asObservable();
  // }

  constructor() {
    for (let i = 0; i < 5; i++) {
      this.quesions.push({
        content: `${this.term1[i]} + ${this.term2[i]}`,
        status: questionStatuses.new,
        correctAnswer: this.term1[i] + this.term2[i],
      });
    }
  }

  fillAnswers(correctAnswer: number) {
    //get random number of correct answer
    let correctAnswerNum: number = Math.floor(Math.random() * 4);
    let arr = Array(4) // array size is 5
      .fill(undefined)
      .map(() => Math.floor(50 * Math.random())); // numbers from 0-50 (exclusive)
    // set correctAnswer value.
    arr[correctAnswerNum] = correctAnswer;
    return arr;
  }
}
