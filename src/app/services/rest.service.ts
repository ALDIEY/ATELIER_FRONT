import { Injectable } from '@angular/core';
// import { RestService } from './rest.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class  RestService<T> {
  protected endpoint: string=""; // Protected property to store the endpoint URL
  constructor(private http: HttpClient ) {}
  setEndpoint(endpoint: string) {
    this.endpoint = endpoint;
  }


  All(): Observable<T[]> {
    return this.http.get<T[]>(this.endpoint);
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.endpoint}/${id}`);
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(this.endpoint, item);
  }

  update(id: number, item: T): Observable<T> {
    return this.http.put<T>(`${this.endpoint}/${id}`, item);
  }

  delete(id: number[]): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
  pagination(paginate:number):Observable<T>{
  return this.http.get<T>(`${this.endpoint}/paginate/${paginate}`)
  }
  getCategoriesArticlesFournisseurs() {
    const url=`${this.endpoint}/categories-articles-fournisseurs`;
    return this.http.get(url);
  }
}
