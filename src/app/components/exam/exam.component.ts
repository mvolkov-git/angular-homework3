import { Component, Injectable, Input } from '@angular/core';
import { sum } from '../util/math.util';

enum questionStatuses {
  new = 0,
  selected = 1,
  answered = 2,
  mistaked = 3,
}

type questionType = {
  content: string;
  status: questionStatuses;
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
    { content: '2+2', status: questionStatuses.new },
    { content: '12+3', status: questionStatuses.new },
    { content: '1+6', status: questionStatuses.new },
    { content: '55+18', status: questionStatuses.new },
    { content: '10+81', status: questionStatuses.new },
  ];
  displayedQuestion: string ="";

  grade: number = 0;

  private _answers: number[] = [];

  public get answers() {
    return this._answers;
  }

  constructor() {
    //  question = new questionType {}
  }

  fillRandomArray() {
    return Array(5) // array size is 5
      .fill(undefined)
      .map(() => Math.floor(50 * Math.random())); // numbers from 0-50 (exclusive)
  }

  selectQuestion(question: questionType) {
    this.selectedQuestion = question;
    this.selectedQuestion.status = questionStatuses.selected;
    console.log(this.selectedQuestion.content)
  }

  getSelectedQuestionContent() {
    return (this.selectedQuestion == null ? "" : this.selectedQuestion.content)
  }
  // selectQuestion(i:number) {
  //   this.quesions[i].status = questionStatuses.selected;
  //   this.quesions[i].content = "selected"
  //   console.log(this.quesions[i].content)
  // }

  resetExam() {
    alert("xcv");
    console.log("resetExam")
  }

  setQuestionStatus(question: questionType, status: questionStatuses) {
    question.status = status;
    return question;
  }

  ngOnInit() {
    this._answers = this.fillRandomArray();
  }

  createNewExam() {
  }

  checkAnswer() {}

  isAnswerCorrect(questNum: number, studentAnswer: number): boolean {
    return this.correctAnswers[questNum] === studentAnswer;
  }
}
