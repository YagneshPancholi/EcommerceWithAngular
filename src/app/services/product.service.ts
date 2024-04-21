import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Cart, Product, User, order } from '../dataTypes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}
  cartData = new EventEmitter<Product[] | []>();
  OnAddToCart = new EventEmitter<Product[] | []>();

  addProduct(data: Product) {
    return this.httpClient.post('https://localhost:44352/api/Product', data);
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
      `http://localhost:3000/products/${data.Id}`,
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
      items = items.filter((item: Product) => item.Id != id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.OnAddToCart.emit(items);
    }
  }
  cancelOrder(orderId: number) {
    return this.httpClient.delete('http://localhost:3000/orders/' + orderId);
  }
  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.httpClient.get<order[]>(
      'http://localhost:3000/orders?userId=' + userData.id
    );
  }
  currentCart() {
    debugger;
    let userStore = localStorage.getItem('user');
    if (userStore) {
      var tempUserData: User[] = JSON.parse(userStore);
      var userId = tempUserData[0].id;
    } else {
      return new Observable<Array<Cart>>();
    }
    return this.httpClient.get<Cart[]>(
      'http://localhost:3000/cart?userId=' + userId
    );
  }
  orderNow(data: order) {
    return this.httpClient.post('http://localhost:3000/orders', data);
  }
  deleteCartItems(cartId: number) {
    return this.httpClient
      .delete('http://localhost:3000/cart/' + cartId)
      .subscribe((result) => {
        this.cartData.emit([]);
      });
  }
  removeToCart(cartId: number) {
    return this.httpClient.delete('http://localhost:3000/cart/' + cartId);
  }
}
