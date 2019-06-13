import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

const BACKEND_URL = environment.uri + 'cart/';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart;
  private userMessage: string;
  private date: number;

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

  createCart(userId: string) {
      return this.http.post(BACKEND_URL + 'addCart', {userId});
  }

  getCart(userId: string) {
    return this.http.get<{message: string, cart: any}>(BACKEND_URL + 'getCart/' + userId)
      .pipe(map(response => {
        if (!response.cart) {
          this.userMessage = response.message;
          return false;
        } else {
          this.cart = response.cart;
          this.date = response.cart[0].date;
          this.userMessage = response.message;
          return true;
        }
      }));
  }
}
