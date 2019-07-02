import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

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
  dateErrorMsg: string;
  dateErrorInput = false;
  successfulOrder = false;

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
    this.successfulOrder = false;
  }

  onBackToShop() {
    this.router.navigate(['shop/' + this.cartId]);
  }

  onGetDefaultShipmentsDetails() {
    this.orderService.getShipmentDetails(this.userId).subscribe(shipmentRes => {
      this.orderForm.controls.city.setValue(shipmentRes.city, { onlySelf: true });
      this.orderForm.controls.street.setValue(shipmentRes.street, { onlySelf: true });
    });
  }

  onOrder() {
    if (this.orderForm.invalid) {
      return;
    }
    const order = {
      userId: this.userId,
      cartId: this.cartId,
      totalPrice: this.totalPrice,
      city: this.orderForm.value.city,
      street: this.orderForm.value.street,
      deliveryDate: this.orderForm.value.date,
      creditCard: this.orderForm.value.creditCard,
    };
    const checkDate = this.checkDate(this.orderForm.value.date);
    if (!checkDate) {
      this.orderService.addOrder(order).subscribe(res => {
        if (res.status) {
          this.orderForm.reset();
          this.successfulOrder = true;
        }
      });
    }
  }

  onBackToHome() {
    this.router.navigate(['/']);
  }

  // TODO: Possibility to download the invoice.
  onDownloadInvoice() {
    // this.orderService.saveInvoice(this.cartId).subscribe(res => {
    //   console.log(res);
      // this.orderService.downloadInvoice(this.cartId).subscribe(resDownload => {
      //   console.log(resDownload);
      // });
    // });
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

  private checkDate(orderDate: any): boolean {
    const date = new Date(orderDate);
    const now = new Date();
    date.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
    if (date < now) {
      this.dateErrorMsg = 'Please select a date for the future.';
      return this.dateErrorInput = true;
    } else {
      this.dateErrorMsg = '';
      return this.dateErrorInput = false;
    }
  }

  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }

}
