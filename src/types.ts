export interface Question {
  id: string;
  title: string;
  type: 'radio' | 'checkbox' | 'textarea';
  options?: string[];
  required: boolean;
  resultLabel: string;
}

export interface UserData {
  firstName: string;
  lastName: string;
  age: string;
}

export type Answers = Record<string, string | string[]>;
