enum AnswerType {
  MULTIPLE_CHOICE
}

export class Choice {
  value: string;
  correct: boolean;
  constructor(value: string, correct: boolean) {
    this.value = value;
    this.correct = correct;
  }
}

export class Challenge {
    id: string;
    prompt?: {
      graphic?: string;
    }
    answers: {
      type: AnswerType;
      choices?: Choice[]
    }

    constructor(id: string, choices: Choice[]) {
      this.id = id;
      this.answers = {
        type: AnswerType.MULTIPLE_CHOICE,
        choices
      };
    }

  }