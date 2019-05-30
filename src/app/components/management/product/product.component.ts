import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../../../services/management/category.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  categories: any;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res.categories;
    });
  }

}
