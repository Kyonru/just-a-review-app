export enum ReviewType {
  daily = 'daily',
  weekly = 'weekly',
  monthly = 'monthly',
  yearly = 'yearly',
  // custom = 'custom',
}

export enum DayOfTheWeek {
  monday = 'monday',
  tuesday = 'tuesday',
  wednesday = 'wednesday',
  thursday = 'thursday',
  friday = 'friday',
  saturday = 'saturday',
  sunday = 'sunday',
}

interface BaseReview {
  title: string;
  description: string;
  time: Date;
  type: any;
  day?: DayOfTheWeek | number;
  date?: Date;
}

export interface Review extends BaseReview {
  log: Review[];
  questions: ReviewQuestion[];
  type: ReviewType;
}

export interface ExternalReview extends BaseReview {
  log: Date[];
  type: 'ExternalReview';
  link: string;
}

export interface ReviewLog {
  date: number;
  duration: number;
  questions: ReviewQuestion;
}

export interface ReviewQuestion {
  id: string;
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
  day: DayOfTheWeek;
  type: ReviewType.weekly;
}

export interface MonthlyReview extends Review {
  day: number;
  type: ReviewType.monthly;
}

export interface YearlyReview extends Review {
  date: Date;
  type: ReviewType.yearly;
}
