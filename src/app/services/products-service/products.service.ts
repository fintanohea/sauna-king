import { Injectable } from '@angular/core';
import { Product } from '../../models/Product';
import { Category } from '../../models/Category';
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

  getProduct(id): Observable<Product> {
    return this.http.get<Product>('/.netlify/functions/getProduct', {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        'id': id
      }
    });
  }

  getProductByTitle(title): Observable<Product> {
    return this.http.get<Product>('/.netlify/functions/getProductByTitle', {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        'title': title
      }
    });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('/.netlify/functions/getCategories', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getProductsByCategory(category): Observable<Product[]> {
    return this.http.get<Product[]>('/.netlify/functions/getProductsByCategory', {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        'category': category
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
