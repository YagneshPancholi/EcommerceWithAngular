import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Cart, Product } from '../dataTypes';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  OnAddToCart = new EventEmitter<Product[] | []>();

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
  addToCart(cartData: Cart) {
    return this.httpClient.post('http://localhost:3000/cart', cartData);
  }
  getRemoteCartListByUserID(userID: number) {
    return this.httpClient.get('http://localhost:3000/cart?userId=' + userID);
  }
  localAddToCart(data: Product) {
    let cartData: Product[];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.OnAddToCart.emit(cartData);
    }
  }
  localRemoveToCart(id: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items = JSON.parse(cartData);
      items = items.filter((item: Product) => item.id != id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.OnAddToCart.emit(items);
    }
  }
}
