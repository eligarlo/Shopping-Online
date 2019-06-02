import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../../environments/environment';

const BACKEND_URL = environment.uri + 'product/';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(name: string, price: number, category: string, image: File) {
    const priceData = String(price);
    const productData = new FormData();
    productData.append('name', name);
    productData.append('price', priceData);
    productData.append('category', category);
    productData.append('image', image, name);
    return this.http.post<{message: string, result: string}>(BACKEND_URL + 'addProduct', productData);
  }
}
