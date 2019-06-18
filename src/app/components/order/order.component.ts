import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { CartModel } from '../../models/cart.model';

import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {

  cartId: string;
  cart: CartModel;
  totalPrice = 0;
  userId: string;
  userIsLogged = false;
  private authListenerSub: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private cartService: CartService,
              private authService: AuthService,
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
    if (this.userIsLogged) {
      this.cartService.getCart(this.userId)
        .subscribe(resCart => {
          if (resCart) {
            this.cart = this.cartService.getCartFromService();
          }
        });
    }
  }

  onBackToShop() {
    this.router.navigate(['shop/' + this.cartId]);
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
