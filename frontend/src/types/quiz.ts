export type QuizCategory = "general" | "science" | "history" | "technology";
export type QuizDifficulty = "Easy" | "Medium" | "Hard";

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
  correctAnswer: string;
}

export interface Quiz {
  id: number;
  title: string;
  category: QuizCategory;
  difficulty: QuizDifficulty;
  author: string;
  questions: QuizQuestion[];
}
