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
  availableLicence?: string[];
  soldLicence?: string[];
  isFeatured?: boolean;
  dateCreated?: string;
  licenceStock?: number;
  // These key aren't belong to product database model but these are used in request object
  orderStatus?: string;
  soldKeys?: string[];
}
