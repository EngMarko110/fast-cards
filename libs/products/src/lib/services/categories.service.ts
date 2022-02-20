import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  apiURLCategories = environment.apiUrl + 'categories';

  constructor(private http: HttpClient) {}
  // main categories services
  getMainCategories(): Observable<Category[]> {
    const url = `${this.apiURLCategories}/mainCategories`;
    return this.http.get<Category[]>(url);
  }
  getMainCategory(mainCategoryId: string): Observable<Category> {
    const url = `${this.apiURLCategories}/mainCategories/${mainCategoryId}`;
    return this.http.get<Category>(url);
  }
  createMainCategory(subCategory: Category): Observable<Category> {
    const url = `${this.apiURLCategories}/mainCategories/new`;
    return this.http.post<Category>(url, subCategory);
  }
  updateMainCategory(mainCategory: Category): Observable<Category> {
    const url = `${this.apiURLCategories}/mainCategories/edit/${mainCategory.id}`;
    return this.http.put<Category>(url, mainCategory);
  }
  deleteMainCategory(mainCategoryId: string): Observable<any> {
    const url = `${this.apiURLCategories}/mainCategories/${mainCategoryId}`;
    return this.http.delete<any>(url);
  }
  // categories services
  getCategories(mainCategory?: string): Observable<Category[]> {
    const url = mainCategory ? `${this.apiURLCategories}/${mainCategory}/getAll` : this.apiURLCategories;
    return this.http.get<Category[]>(url);
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
  // sub categories services
  getSubCategories(parentCategory: string): Observable<Category[]> {
    const url = `${this.apiURLCategories}/${parentCategory}/subCategories`;
    return this.http.get<Category[]>(url);
  }
  getSubCategory(subCategoryId: string): Observable<Category> {
    const url = `${this.apiURLCategories}/subCategories/${subCategoryId}`;
    return this.http.get<Category>(url);
  }
  createSubCategory(subCategory: Category): Observable<Category> {
    const url = `${this.apiURLCategories}/subCategories/new`;
    return this.http.post<Category>(url, subCategory);
  }
  updateSubCategory(subCategory: Category): Observable<Category> {
    const url = `${this.apiURLCategories}/subCategories/edit/${subCategory.id}`;
    return this.http.put<Category>(url, subCategory);
  }
  deleteSubCategory(subCategoryId: string): Observable<any> {
    const url = `${this.apiURLCategories}/subCategories/${subCategoryId}`;
    return this.http.delete<any>(url);
  }
}
