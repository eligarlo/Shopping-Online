import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import { CategoryModel } from '../../models/category.model';

import {environment} from '../../../environments/environment';

const BACKEND_URL = environment.uri + 'category/';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  addCategory(form: FormGroup) {
    return this.http.post<{message: string, result: boolean}>(BACKEND_URL + 'addCategory', form);
  }

  getCategories() {
    return this.http.get<{message: string, categories: CategoryModel[]}>(BACKEND_URL + 'getCategories');
  }
}
