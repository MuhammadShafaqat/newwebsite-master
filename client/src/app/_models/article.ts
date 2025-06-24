export interface Article {
  id: string;
  title: string;
  body: string;
  imageUrl: string;
  createdAt: string; // ISO date string
  updatedAt?: string;
}
