import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

const BACKEND_URL = environment.uri + 'order/';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getShipmentDetails(userId: string) {
    return this.http.get<{city: string, street: string}>(BACKEND_URL + 'getShipmentDetails/' + userId);
  }

  addOrder(form) {
    return this.http.post<{ message: string, status: boolean}>(BACKEND_URL + 'createOrder', form);
  }

  getOrders() {
    return this.http.get<{message: string, orders: any}>(BACKEND_URL + 'getOrders');
  }
}
