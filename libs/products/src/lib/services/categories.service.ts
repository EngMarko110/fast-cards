import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, SubCategory } from '../models/category';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  apiURLCategories = environment.apiUrl + 'categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiURLCategories);
  }

  getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiURLCategories}/${categoryId}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiURLCategories, category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiURLCategories}/${category.id}`, category);
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLCategories}/${categoryId}`);
  }

  getSubCategories(parentCategory: string): Observable<SubCategory[]> {
    const url = `${this.apiURLCategories}/${parentCategory}/subCategories`;
    return this.http.get<SubCategory[]>(url);
  }
  getSubCategory(subCategoryId: string): Observable<SubCategory> {
    const url = `${this.apiURLCategories}/subCategories/${subCategoryId}`;
    return this.http.get<SubCategory>(url);
  }
  createSubCategory(subCategory: SubCategory): Observable<SubCategory> {
    const url = `${this.apiURLCategories}/subCategories/new`;
    return this.http.post<SubCategory>(url, subCategory);
  }
  updateSubCategory(subCategory: SubCategory): Observable<SubCategory> {
    const url = `${this.apiURLCategories}/subCategories/edit/${subCategory._id}`;
    return this.http.put<SubCategory>(url, subCategory);
  }
  deleteSubCategory(subCategoryId: string): Observable<any> {
    const url = `${this.apiURLCategories}/subCategories/${subCategoryId}`;
    return this.http.delete<any>(url);
  }
}
