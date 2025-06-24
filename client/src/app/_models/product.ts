export interface Product {
  id?: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  stock: number;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  isExternal?: boolean;
  externalUrl?: string;
  isActive?: boolean;
  featured?: boolean;
  size?: 'S' | 'M' | 'L';
}
