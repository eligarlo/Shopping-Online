import { Component, OnInit } from '@angular/core';

import { ProductModel } from '../../models/product.model';

import { CategoryService } from '../../services/management/category.service';
import { ProductService } from '../../services/management/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  showCart = false;
  buttonToggleCart = 'Show Cart';
  categories: [];
  products: ProductModel[];
  noProducts = false;
  productClicked = false;
  productClickedName = '';

  constructor(private categoryService: CategoryService, private productService: ProductService) { }

  ngOnInit() {
    this.categoryService.getCategories()
      .subscribe(resCategories => {
        this.categories = resCategories.categories;
      });
    this.productService.getProducts()
      .subscribe(resProducts => {
        this.products = resProducts.products;
      });
  }

  toggleCart() {
    this.showCart = !this.showCart;
    (this.showCart) ? this.buttonToggleCart = 'Hide Cart' : this.buttonToggleCart = 'Show Cart';
  }

  onGetProductByCategory(category) {
    this.productService.getProductsByCategory(category)
      .subscribe(resProducts => {
        (resProducts.products.length !== 0) ? this.products = resProducts.products : this.noProducts = true;
      });
  }

  onGetProducts() {
    this.productService.getProducts()
      .subscribe(resProducts => {
        this.products = resProducts.products;
      });
  }

  onClickProduct(event, productName) {
    if (event.path[0].alt === productName) {
      this.productClicked = true;
      this.productClickedName = productName;
    }
  }

  onContinueShopping() {
    this.productClickedName = '';
  }

}
