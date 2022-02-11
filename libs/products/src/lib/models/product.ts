import { Category, SubCategory } from './category';

export class Product {
  id?: string;
  name?: string;
  description?: string;
  richDescription?: string;
  image?: string;
  images?: string[];
  brand?: string;
  price?: number;
  category?: Category;
  subCategory?: SubCategory;
  countInStock?: number;
  // rating?: number;
  // numReviews?: number;
  isFeatured?: boolean;
  dateCreated?: string;
}
