import { Observable } from 'rxjs';
import { SEO } from '../models/seo';
import { HttpClient } from '@angular/common/http';
import { environment as env} from './../../../../../environments/environment';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SeoService {
blogUrl=env.apiUrl+'blog';
faqUrl=env.apiUrl+'faq';
  constructor(private http:HttpClient) { }
  /*=====================Blog===========================*/
  //get all blogs
  getAllBlog():Observable<SEO[]> {
    return this.http.get<SEO[]>(`${this.blogUrl}/`);
  }
  //get  blog by id
  getBlogById(blogId:string):Observable<SEO> {
    return this.http.get<SEO>(`${this.blogUrl}/${blogId}`);
  }
  //create  blog 
  createBlog(blog:SEO):Observable<any> {
    return this.http.post<any>(`${this.blogUrl}`,blog);
  }
  //update  blog 
  updateBlog(blogId:string,blog):Observable<any> {
    return this.http.put<any>(`${this.blogUrl}/${blogId}`,blog);
  }
  //update  blog 
  deleteBlog(blogId:string):Observable<any> {
    return this.http.delete<any>(`${this.blogUrl}/${blogId}`);
  }
  /*=====================FAQ===========================*/
  //get all faq
  getAllFAQ():Observable<SEO[]> {
    return this.http.get<SEO[]>(`${this.faqUrl}/`);
  }
  //get  faq by id
  getFAQById(faqId:string):Observable<SEO> {
    return this.http.get<SEO>(`${this.faqUrl}/${faqId}`);
  }
  //create  faq
  createFAQ(faq:SEO):Observable<any> {
    return this.http.post<any>(`${this.faqUrl}`,faq);
  }

   //update  faq 
   updateFAQ(faqId:string,faq):Observable<any> {
    return this.http.put<any>(`${this.faqUrl}/${faqId}`,faq);
  }
  //delete  faq 
  deleteFAQ(faqId:string):Observable<any> {
    return this.http.delete<any>(`${this.faqUrl}/${faqId}`);
  }
}
