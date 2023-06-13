import { Component } from '@angular/core';
import { ExamService } from 'src/app/services/exam.service';
import { Observable, map, tap } from 'rxjs';
import { questionStatuses, questionType } from 'src/app/common/exam';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
})
export class ExamComponent {
  selectedQuestion: questionType | undefined;
  displayedQuestion: string = '';
  grade: number = 0;

  private _answers: number[] = [];
  public get answers() {
    return this._answers;
  }

  constructor(private service: ExamService) {}

  quesions$: Observable<questionType[]> = this.service.quesions$;

  answers$: Observable<number[]> = new Observable<number[]>;// = this.service.answers$;

  public getQuestionClass(status: questionStatuses) {
    switch (status) {
      case questionStatuses.new:
        return this.selectedQuestion != undefined &&
          this.selectedQuestion.status === questionStatuses.selected
          ? 'button-question disabled'
          : 'button-question';
      case questionStatuses.selected:
        return 'button-question selected-question disabled';
      case questionStatuses.correct:
        return 'button-question  correct-answered-question disabled';
      case questionStatuses.wrong:
        return 'button-question  wrong-answered-question disabled';
      default:
        return 'button-question';
    }
  }

  public getAnswerClass() {
    if (this.selectedQuestion && this.selectedQuestion.status > 1) {
      return 'answer disabled';
    }
    return 'answer';
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
          }
        }
      });

      if (enabled) {
        this.selectedQuestion = question;
        this.selectedQuestion.status = questionStatuses.selected;

        // this._answers = this.service.fillAnswers(
        //   this.selectedQuestion.correctAnswer
        // );
        // this.answers$ = this.service.getAnswers(566).pipe(
        //   map((val) => val)
        // );
        this.answers$ = this.service.getAnswers(this.selectedQuestion.correctAnswer);
        // console.log(this.answers$.forEach(function (value){}));
      }
    }
  }

  getSelectedQuestionContent() {
    return this.selectedQuestion == null
      ? ''
      : this.selectedQuestion.content +
          (this.selectedQuestion.status === questionStatuses.wrong
            ? ' ≠ '
            : ' = ') +
          (this.selectedQuestion.studentAnswer ?? '?');
  }

  // resetExam() {
  //   alert('xcv');
  //   console.log('resetExam');
  // }

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
      // this.toggle = !this.toggle;
      console.log(
        this.getSelectedQuestionContent() +
          ': ' +
          (result ? 'correct' : 'wrong')
      );
    }
  }
}
