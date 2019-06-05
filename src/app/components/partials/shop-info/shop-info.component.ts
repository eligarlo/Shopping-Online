import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';

import { ProductService } from '../../../services/management/product.service';
import { AuthService } from '../../../services/auth.service';

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

  constructor(private productService: ProductService, private authService: AuthService) { }

  ngOnInit() {
    this.userIsLogged = this.authService.getIsAuth();
    this.role = this.authService.getRole();
    this.productService.getProducts().subscribe(res => {
      this.totalProducts = res.products.length;
    });
    this.authListenerSub = this.authService.getAuthStatusListener()
      .subscribe(isLogged => {
        this.userIsLogged = isLogged;
        this.role = this.authService.getRole();
      });
  }

  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }

}
