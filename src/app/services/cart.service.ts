import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { CartModel } from '../models/cart.model';

import { environment } from '../../environments/environment';

const BACKEND_URL = environment.uri + 'cart/';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart;
  private userMessage: string;
  private date: number;
  private cartId: string;

  constructor(private http: HttpClient) { }

  getCartFromService() {
    return this.cart;
  }

  getUserMessage() {
    return this.userMessage;
  }

  getDate() {
    return new Date(this.date).toDateString();
  }

  getCartId() {
    return this.cartId;
  }

  createCart(userId: string) {
      return this.http.post<{message: string, cart: CartModel}>(BACKEND_URL + 'addCart', {userId});
  }

  getCart(userId: string) {
    return this.http.get<{message: string, cart: any}>(BACKEND_URL + 'getCart/' + userId)
      .pipe(map(response => {
        if (!response.cart) {
          this.userMessage = response.message;
          return false;
        } else {
          this.cart = response.cart[0];
          this.date = response.cart[0].date;
          this.cartId = response.cart[0]._id;
          this.userMessage = response.message;
          return true;
        }
      }));
  }

  getCartByCartId(cartId: string) {
    return this.http.get<{message: string, cart: CartModel}>(BACKEND_URL + 'getByCartId/' + cartId)
      .pipe(map( response => {
        this.cart = response.cart[0];
        return true;
      }));
  }

  addToCart(product: any) {
    const productData = product;
    productData.cartId = this.cartId;
    return this.http.post(BACKEND_URL + 'addProduct', productData);
  }

  deleteFromCart(productData) {
    return this.http.post(BACKEND_URL + 'deleteProduct', productData);
  }

  deleteAllFromCart(productData) {
    return this.http.post(BACKEND_URL + 'deleteAllProducts', productData);
  }

}
