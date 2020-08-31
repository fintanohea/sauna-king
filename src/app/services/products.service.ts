import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/.netlify/functions/getProducts', {
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }

  getProduct(id): Observable<Product[]> {
    return this.http.get<Product[]>('/.netlify/functions/getProduct', {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        'id': id
      }
    });
  }

  modifyProduct(id): Observable<Product[]> {
    return this.http.get<Product[]>('/.netlify/functions/modifyProduct', {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        'id': id
      }
    });
  }
}
