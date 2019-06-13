import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ProductModel } from '../../models/product.model';
import { CategoryModel } from '../../models/category.model';
import { CartModel } from '../../models/cart.model';

import { CategoryService } from '../../services/management/category.service';
import { ProductService } from '../../services/management/product.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy {

  userIsLogged = false;
  userId: string;
  private authListenerSub: Subscription;
  showCart = false;
  buttonToggleCart = 'Show Cart';
  categories: CategoryModel[];
  products: ProductModel[];
  noProducts = false;
  productClicked = false;
  productClickedName = '';
  cart: CartModel;
  product = {
    name: undefined,
    quantity: undefined,
    price: undefined,
    image: undefined
  };

  constructor(private categoryService: CategoryService,
              private productService: ProductService,
              private authService: AuthService,
              private cartService: CartService) { }

  ngOnInit() {
    this.userIsLogged = this.authService.getIsAuth();
    this.userId = this.authService.getUserId();
    this.authListenerSub = this.authService.getAuthStatusListener()
      .subscribe(isLogged => {
        this.userIsLogged = isLogged;
        this.userId = this.authService.getUserId();
      });
    this.categoryService.getCategories()
      .subscribe(resCategories => {
        this.categories = resCategories.categories;
      });
    this.productService.getProducts()
      .subscribe(resProducts => {
        this.products = resProducts.products;
        console.log(this.products);
      });
    if (this.userIsLogged) {
      this.cartService.getCart(this.userId)
        .subscribe(resCart => {
          if (resCart) {
            this.cart = this.cartService.getCartFromService();
            console.log(this.cart);
          }
        });
    }
  }

  onSearch(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.productService.getProductByName(form.value.search)
      .subscribe(resProduct => {
        (resProduct.product.length !== 0) ? this.products = resProduct.product : this.noProducts = true;
      });
  }

  toggleCart() {
    this.showCart = !this.showCart;
    (this.showCart) ? this.buttonToggleCart = 'Hide Cart' : this.buttonToggleCart = 'Show Cart';
  }

  onGetProductByCategory(category) {
    this.products.length = 0;
    this.noProducts = false;
    this.productService.getProductsByCategory(category)
      .subscribe(resProducts => {
        (resProducts.products.length !== 0) ? this.products = resProducts.products : this.noProducts = true;
      });
  }

  onGetProducts() {
    this.products.length = 0;
    this.noProducts = false;
    this.productService.getProducts()
      .subscribe(resProducts => {
        this.products = resProducts.products;
      });
  }

  onClickProduct(event, productName, productPrice) {
    console.log(event.path[0]);
    if (event.path[0].alt === productName) {
      this.productClicked = true;
      this.productClickedName = productName;
      this.product.name = productName;
      this.product.price = productPrice;
      this.product.image = event.path[0].currentSrc;
    }
  }

  onContinueShopping() {
    this.productClickedName = '';
  }

  onAddToCart(form: NgForm) {
    this.product.quantity = form.value.quantity;
    console.log(form.value.quantity);
    form.reset();
    this.productClickedName = '';
  }

  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }

}
