export interface Book {
  id: number;
  name: string;
  score?: number;
  scores: number[];
}

export interface ReturnBookInput {
  userId: string;
  bookId: string;
  score: number;
}