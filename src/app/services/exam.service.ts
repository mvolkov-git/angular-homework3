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

  quesions: questionType[] = [
    { content: '2+2', status: questionStatuses.new, correctAnswer: 4 },
    { content: '12+3', status: questionStatuses.new, correctAnswer: 15 },
    { content: '1+6', status: questionStatuses.new, correctAnswer: 7 },
    { content: '55+18', status: questionStatuses.new, correctAnswer: 73 },
    { content: '10+81', status: questionStatuses.new, correctAnswer: 91 },
  ];

  private counterSubject = new BehaviorSubject<questionType[]>(this.quesions);

  // getRandomArray(correctAnswer: number) {
  //   let correctAnswernum: number = Math.floor(Math.random() * 4);
  //   let arr = Array(4) // array size is 5
  //     .fill(undefined)
  //     .map(() => Math.floor(50 * Math.random())); // numbers from 0-50 (exclusive)
  //   arr[correctAnswernum] = correctAnswer;
  //   return arr;
  // }

  get quesions$(): Observable<questionType[]> {
    return this.counterSubject.asObservable();
}


  constructor() { }
}
