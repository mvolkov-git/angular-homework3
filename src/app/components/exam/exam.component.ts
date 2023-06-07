import { Component } from '@angular/core';
import { sum } from '../util/math.util';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
})
export class ExamComponent {
  quesions: string[] = ['2+2', '12+3', '1+6', '55+18', '10+81'];
  term1: number[] = [0, 0, 0, 0, 0];
  term2: number[] = [0, 0, 0, 0, 0];
  correctAnswers: number[] = [4, 5, 7];
  answerOptions: number[] = [5];
  question: string = '';

  percentOfCorrectAnswers: number = 0;

  fillRandomArray(arr: number[]) {
    arr = Array(5) // array size is 5
      .fill(undefined)
      .map(() => Math.floor(50 * Math.random())); // numbers from 0-50 (exclusive)
  }

  resetExam() {}

  // fillAnswerOptions(questNum: number) {
  //   this.answerOptions = Array(5) // array size is 5
  //     .fill(undefined)
  //     .map(() => Math.floor(100 * Math.random())); // numbers from 0-100 (exclusive)
  // }

  constructor() {}

  createNewExam() {}

  isAnswerCorrect(questNum: number, studentAnswer: number): boolean {
    return this.correctAnswers[questNum] === studentAnswer;
  }
}
