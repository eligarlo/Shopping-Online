import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userIsLogged = false;
  username: string;
  email: string;
  private authListenerSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userIsLogged = this.authService.getIsAuth();
    this.username = this.authService.getUsername();
    this.email = this.authService.getEmail();
    this.authListenerSub = this.authService.getAuthStatusListener()
    .subscribe(isLogged => {
      this.userIsLogged = isLogged;
      this.username = this.authService.getUsername();
      this.email = this.authService.getEmail();
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }

}
