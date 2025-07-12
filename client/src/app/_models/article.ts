export interface Article {
  id: string;
  title: string;
  body: string;
  author: string;
  imageUrls: string[];
  createdAt: string; // ISO date string
  updatedAt?: string;
}
