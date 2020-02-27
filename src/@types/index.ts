export enum ReviewType {
  daily = 'daily',
  weekly = 'weekly',
  monthly = 'monthly',
  yearly = 'yearly',
  custom = 'custom',
}

export interface Review {
  title: string;
  description: string;
  time: Date;
  type: ReviewType;
  questions: ReviewQuestion[];
  log: Review[];
}

export interface ReviewLog {
  date: number;
  duration: number;
  questions: ReviewQuestion;
}

export interface ReviewQuestion {
  q: string;
  required?: boolean;
  answer?: ReviewQuestionAnswer;
}

export interface ReviewQuestionAnswer {
  content: string;
  image: string[];
  files: string[];
  voiceNotes: string[];
}

export interface WeeklyReview extends Review {
  date: Date;
  type: ReviewType.weekly;
}
