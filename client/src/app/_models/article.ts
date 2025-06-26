export interface Article {
  id: string;
  title: string;
  body: string;
  author: string;
  imageUrl: string;
  createdAt: string; // ISO date string
  updatedAt?: string;
}
