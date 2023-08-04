import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../dataTypes';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  addProduct(data: Product) {
    return this.httpClient.post('http://localhost:3000/products', data);
  }

  getProducts() {
    return this.httpClient.get<Product[]>('http://localhost:3000/products');
  }

  getProductById(id: number) {
    return this.httpClient.get<Product>(`http://localhost:3000/products/${id}`);
  }

  deleteProduct(id: number) {
    return this.httpClient.delete(`http://localhost:3000/products/${id}`);
  }

  updateProduct(data: Product) {
    return this.httpClient.put<Product>(
      `http://localhost:3000/products/${data.id}`,
      data
    );
  }

  popularProducts() {
    return this.httpClient.get<Product[]>(
      'http://localhost:3000/products?_limit=3'
    );
  }

  trendingProducts() {
    return this.httpClient.get<Product[]>(
      'http://localhost:3000/products?_limit=8'
    );
  }

  searchProducts(query: string) {
    return this.httpClient.get<Product[]>(
      `http://localhost:3000/products?q=${query}`
    );
  }
}
