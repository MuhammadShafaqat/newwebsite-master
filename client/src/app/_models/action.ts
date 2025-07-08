export interface Action {
  _id?: string;
  title: string;
  descriptions: string[];
  images: string[];
  createdAt?: string;
}