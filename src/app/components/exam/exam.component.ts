import { Component, Injectable, Input } from '@angular/core';
import { sum } from '../util/math.util';

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

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
})
export class ExamComponent {
  // quesions_old: string[] = ['2+2', '12+3', '1+6', '55+18', '10+81'];
  term1: number[] = [0, 0, 0, 0, 0];
  term2: number[] = [0, 0, 0, 0, 0];
  correctAnswers: number[] = [4, 5, 7];
  selectedQuestion: questionType | undefined;
  quesions: questionType[] = [
    { content: '2+2', status: questionStatuses.new, correctAnswer: 4 },
    { content: '12+3', status: questionStatuses.new, correctAnswer: 15 },
    { content: '1+6', status: questionStatuses.new, correctAnswer: 7 },
    { content: '55+18', status: questionStatuses.new, correctAnswer: 73 },
    { content: '10+81', status: questionStatuses.new, correctAnswer: 91 },
  ];
  displayedQuestion: string = '';
  grade: number = 0;
  toggle = true;

  private _answers: number[] = [];
  public get answers() {
    return this._answers;
  }

  constructor() {}

  fillRandomArray(correctAnswer: number) {
    let correctAnswernum: number = Math.floor(Math.random() * 4);
    let arr = Array(4) // array size is 5
      .fill(undefined)
      .map(() => Math.floor(50 * Math.random())); // numbers from 0-50 (exclusive)
    arr[correctAnswernum] = correctAnswer;
    return arr;
  }

  selectQuestion(question: questionType) {
    if (question.status == questionStatuses.new) {
      this.selectedQuestion = question;
      this.selectedQuestion.status = questionStatuses.selected;
      this._answers = this.fillRandomArray(this.selectedQuestion.correctAnswer);
      console.log(question.status);
      console.log(this.selectedQuestion.content);
    }
  }

  getSelectedQuestionContent() {
    return this.selectedQuestion == null
      ? ''
      : this.selectedQuestion.content + ' = ' + (this.selectedQuestion.studentAnswer ?? "" );
  }
  // selectQuestion(i:number) {
  //   this.quesions[i].status = questionStatuses.selected;
  //   this.quesions[i].content = "selected"
  //   console.log(this.quesions[i].content)
  // }

  resetExam() {
    alert('xcv');
    console.log('resetExam');
  }

  setQuestionStatus(question: questionType, status: questionStatuses) {
    question.status = status;
    return question;
  }

  ngOnInit() {
    // this._answers = this.fillRandomArray();
  }

  checkAnswer(studentAnswer: number) {
    if (
      this.selectedQuestion != null &&
      this.selectedQuestion.status == questionStatuses.selected
    ) {
      this.selectedQuestion.studentAnswer = studentAnswer;
      let result = this.selectedQuestion.correctAnswer == studentAnswer;
      if (result) {
        this.selectedQuestion.status = questionStatuses.correct;
        this.grade = this.grade + 20;
      } else {
        this.selectedQuestion.status = questionStatuses.wrong;
      }
      // this._answers = [];
      this.toggle = !this.toggle;
      console.log(result);
    }
  }

  isAnswerCorrect(questNum: number, studentAnswer: number): boolean {
    return this.correctAnswers[questNum] == studentAnswer;
  }
}
