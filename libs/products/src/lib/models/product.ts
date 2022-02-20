import { Category } from './category';

export class Product {
  id?: string;
  name?: string;
  description?: string;
  richDescription?: string;
  image?: string;
  images?: string[];
  brand?: string;
  price?: number;
  mainCategory?: Category;
  category?: Category;
  subCategory?: Category;
  countInStock?: number;
  // rating?: number;
  // numReviews?: number;
  isFeatured?: boolean;
  dateCreated?: string;
}
