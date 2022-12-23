enum ChallengeType {
  MULTIPLE_CHOICE
}

export class Answer {
  value: string;
  correct: boolean;
  constructor(value: string, correct: boolean) {
    this.value = value;
    this.correct = correct;
  }
}

export class Challenge {
    id: string;
    type: ChallengeType;
    graphic?: string;
    answers: Answer[]

    constructor(id: string, type: ChallengeType, answers: Answer[]) {
      this.id = id;
      this.type = type;
      this.answers = answers;
    }

  }