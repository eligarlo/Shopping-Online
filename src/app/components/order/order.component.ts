import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

import { CartModel } from '../../models/cart.model';
import { ProductModel } from '../../models/product.model';

import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {

  cartId: string;
  cart: CartModel;
  products: ProductModel[];
  totalPrice = 0;
  userId: string;
  userIsLogged = false;
  private authListenerSub: Subscription;

  orderForm: FormGroup;
  cities: string[] = ['City', 'Madrid', 'Barcelona', 'Valencia', 'Seville'];
  defaultCity = 'City';

  constructor(private activatedRoute: ActivatedRoute,
              private cartService: CartService,
              private authService: AuthService,
              private orderService: OrderService,
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
    this.orderForm = new FormGroup({
      city: new FormControl(null, {
        validators: [Validators.required]
      }),
      street: new FormControl(null, {
        validators: [Validators.required]
      }),
      date: new FormControl(null, {
        validators: [Validators.required]
      }),
      creditCard: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.orderForm.controls.city.setValue(this.defaultCity, { onlySelf: true });
  }

  onBackToShop() {
    this.router.navigate(['shop/' + this.cartId]);
  }

  onGetDefaultShipmentsDetails() {
    this.orderService.getShipmentDetails(this.userId).subscribe(shipmentRes => {
      console.log(shipmentRes);
      this.orderForm.controls.city.setValue(shipmentRes.city, { onlySelf: true });
      this.orderForm.controls.street.setValue(shipmentRes.street, { onlySelf: true });
    });
  }

  onOrder() {
    console.log(this.orderForm.value);
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
