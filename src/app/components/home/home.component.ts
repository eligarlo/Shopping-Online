import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  userIsLogged = false;
  role: number;
  userId: string;
  private authListenerSub: Subscription;
  hasCart: boolean;
  cart;

  constructor(private authService: AuthService,
              private router: Router,
              private cartService: CartService) { }

  ngOnInit() {
    this.userIsLogged = this.authService.getIsAuth();
    this.role = this.authService.getRole();
    this.userId = this.authService.getUserId();
    this.authListenerSub = this.authService.getAuthStatusListener()
      .subscribe(isLogged => {
        this.userIsLogged = isLogged;
        this.role = this.authService.getRole();
        this.userId = this.authService.getUserId();
      });
    if (this.role === null || this.role === undefined) {
      this.cartService.getCart(this.userId)
        .subscribe(resCart => {
          if (!resCart) {
            this.hasCart = false;
            this.cartService.createCart(this.userId)
              .subscribe(resNewCart => {
                console.log(resNewCart);
              });
          } else {
            this.hasCart = true;
          }
          }
        );
    }
  }

  toManagement() {
    this.router.navigate(['/management']);
  }

  toShopping() {
    this.router.navigate(['/shop']);
  }

  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }

}
