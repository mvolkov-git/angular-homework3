export enum questionStatuses {
  new = 0,
  selected = 1,
  correct = 2,
  wrong = 3,
}

export type questionType = {
  content: string;
  status: questionStatuses;
  correctAnswer: number;
  studentAnswer?: number;
};
