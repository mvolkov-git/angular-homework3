import { Component, Injectable, Input } from '@angular/core';
import { sum } from '../util/math.util';
import { ExamService } from 'src/app/services/exam.service';
import { Observable, map, tap } from 'rxjs';

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
  // quesions: questionType[] | undefined;

  displayedQuestion: string = '';
  grade: number = 0;
  toggle = true;

  private _answers: number[] = [];
  public get answers() {
    return this._answers;
  }

  constructor(private service: ExamService) {}

  quesions$: Observable<questionType[]> = this.service.quesions$;

  fillRandomArray(correctAnswer: number) {
    let correctAnswernum: number = Math.floor(Math.random() * 4);
    let arr = Array(4) // array size is 5
      .fill(undefined)
      .map(() => Math.floor(50 * Math.random())); // numbers from 0-50 (exclusive)
    arr[correctAnswernum] = correctAnswer;
    return arr;
  }

  selectQuestion(question: questionType) {
    let enabled: boolean = true;
    if (question.status == questionStatuses.new) {
      this.quesions$.forEach(function (value) {
        for (let i = 0; i < 5; i++) {
          // console.log(i + " - " + value.indexOf(question));
          if (
            value[i].status === questionStatuses.selected &&
            value.indexOf(question) != i
          ) {
            enabled = false;
            // alert('Answer to selected question');

            // return;
          }
          // console.log(value[i]);
        }

        // console.log(value[0].status);
      });

      if (enabled) {
        this.selectedQuestion = question;
        this.selectedQuestion.status = questionStatuses.selected;
        this._answers = this.fillRandomArray(
          this.selectedQuestion.correctAnswer
        );
        // console.log(question.status);
        // console.log(this.selectedQuestion.content);
      }
    }
  }

  getSelectedQuestionContent() {
    return this.selectedQuestion == null
      ? ''
      : this.selectedQuestion.content +
          ' = ' +
          (this.selectedQuestion.studentAnswer ?? '');
  }

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
