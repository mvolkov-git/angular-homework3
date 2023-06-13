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

  answers$: Observable<number[]> = new Observable<number[]>();

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
    this.selectedQuestion = question;
    this.selectedQuestion.status = questionStatuses.selected;
    this.answers$ = this.service.getAnswers(
      this.selectedQuestion.correctAnswer
    );
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

  resetExam() {
    window.location.reload();
  }

  setQuestionStatus(question: questionType, status: questionStatuses) {
    question.status = status;
    return question;
  }

  checkAnswer(studentAnswer: number) {
    //  this.service.quesions$.subscribe((data)=> (console.log(data)));
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
      console.log(
        this.getSelectedQuestionContent() +
          ': ' +
          (result ? 'correct' : 'wrong')
      );
    }
  }
}
