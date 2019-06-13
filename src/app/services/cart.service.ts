import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

const BACKEND_URL = environment.uri + 'cart/';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  createCart(userId) {
      return this.http.post(BACKEND_URL + 'addCart', {userId});
  }
}
