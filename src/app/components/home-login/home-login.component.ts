import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrls: ['./home-login.component.css']
})
export class HomeLoginComponent implements OnInit {

  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.getIsAuth();
    if (this.isAuthenticated) {
      this.router.navigate(['/']);
    }
  }

}
