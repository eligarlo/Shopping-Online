import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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
  totalPrice = 0;
  cartId: string;

  constructor(private categoryService: CategoryService,
              private productService: ProductService,
              private authService: AuthService,
              private cartService: CartService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.activatedRoute.params.subscribe(paramsRes => {
      if (paramsRes.cartId) {
        this.cartId = paramsRes.cartId;
        this.updateCart();
      }
    });
  }

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
      });
    if (this.userIsLogged) {
      this.cartService.getCart(this.userId)
        .subscribe(resCart => {
          if (resCart) {
            this.cart = this.cartService.getCartFromService();
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

  onClickProduct(event, productName, productPrice, imagePath) {
    if (event.path[0].alt === productName) {
      this.productClicked = true;
      this.productClickedName = productName;
      this.product.name = productName;
      this.product.price = productPrice;
      this.product.image = imagePath;
    }
  }

  onContinueShopping() {
    this.productClickedName = '';
  }

  onAddToCart(form: NgForm) {
    this.product.quantity = form.value.quantity;
    this.cartService.addToCart(this.product).subscribe(res => {
      this.updateCart();
      form.reset();
      this.productClickedName = '';
    });
  }

  onDeleteFromCart(productId) {
    this.cartService.deleteFromCart({cartId: this.cartId, productId}).subscribe(res => {
      this.updateCart();
    });
  }

  onDeleteAllProducts() {
    const productsId = [];
    for (let i = 0; i < this.cart.products.length; i++) {
      productsId.push(this.cart.products[i]._id);
    }
    this.cartService.deleteAllFromCart({cartId: this.cartId, productsId}).subscribe(res => {
      this.updateCart();
    });
  }

  onGoToOrder() {
    if (this.totalPrice === 0) {
      return alert('Please add products to your cart first');
    }
    this.router.navigate(['order/' + this.cartId]);
  }

  private updateCart() {
    this.cartService.getCartByCartId(this.cartId).subscribe(response => {
      this.cart = this.cartService.getCartFromService();
      this.totalPrice = 0;
      for (let i = 0; i < this.cart.products.length; i++) {
        this.totalPrice += (this.cart.products[i].price * this.cart.products[i].quantity);
      }
    });
  }

  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }

}
