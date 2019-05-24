import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrls: ['./home-login.component.css']
})
export class HomeLoginComponent implements OnInit {

  userIsLogged = false;
  private authListenerSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userIsLogged = this.authService.getIsAuth();
  }

}
