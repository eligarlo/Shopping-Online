import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';

import { ProductService } from '../../../services/management/product.service';
import { AuthService } from '../../../services/auth.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-shop-info',
  templateUrl: './shop-info.component.html',
  styleUrls: ['./shop-info.component.css']
})
export class ShopInfoComponent implements OnInit, OnDestroy {

  orders: number;
  totalProducts: number;
  userIsLogged = false;
  role: number;
  private authListenerSub: Subscription;
  userId: string;
  hasCart: boolean;
  userMessage: string;
  cartDate;

  constructor(private productService: ProductService,
              private authService: AuthService,
              private cartService: CartService) {

  }

  ngOnInit() {
    this.userIsLogged = this.authService.getIsAuth();
    this.role = this.authService.getRole();
    this.userId = this.authService.getUserId();
    this.productService.getProducts().subscribe(res => {
      this.totalProducts = res.products.length;
    });
    this.authListenerSub = this.authService.getAuthStatusListener()
      .subscribe(isLogged => {
        this.userIsLogged = isLogged;
        this.role = this.authService.getRole();
        this.userId = this.authService.getUserId();
      });
    if (this.userIsLogged && (this.role === undefined || this.role === null)) {
      this.cartService.getCart(this.userId)
        .subscribe(resCart => {
            if (!resCart) {
              this.hasCart = resCart;
              this.userMessage = this.cartService.getUserMessage();
            } else {
              this.hasCart = resCart;
              this.userMessage = this.cartService.getUserMessage();
              this.cartDate = this.cartService.getDate();
              console.log(this.cartDate);
            }
          }
        );
    }
  }

  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }

}
