import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  


  constructor(private http: HttpClient) { }

  private baseUrl= 'http://localhost:5000/api';

  getProducts(): Observable <any> {
    return this.http.get(`${this.baseUrl}/products`);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/${id}`);
  }

}
