export interface Product {
  _id?: string;
  title: string;
  price: number;
  image: string;
  isFeatured: boolean;
  isExternal: boolean;
  externalUrl: string;
}