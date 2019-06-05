import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  userIsLogged = false;
  role: number;
  private authListenerSub: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.userIsLogged = this.authService.getIsAuth();
    this.role = this.authService.getRole();
    this.authListenerSub = this.authService.getAuthStatusListener()
      .subscribe(isLogged => {
        this.userIsLogged = isLogged;
        this.role = this.authService.getRole();
      });
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
