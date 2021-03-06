import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.uri + 'user/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private token: string;
  private userId: string;
  private username = 'Guest';
  private email = 'email';
  private role: number;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUserId() {
    return this.userId;
  }

  getUsername() {
    return this.username;
  }

  getEmail() {
    return this.email;
  }

  getRole() {
    return this.role;
  }

  checkUser(form) {
    return this.http.post(BACKEND_URL + 'signupCheck', form).pipe(map(user => {
      return user;
    })
    );
  }

  registerUser(form: FormGroup) {
    return this.http.post(BACKEND_URL + 'signup', form);
  }

  login(form: FormGroup) {
    return this.http.post<{token: string, userId: string, name: string, email: string, role: number}>(BACKEND_URL + 'login', form)
    .pipe(map(response => {
      this.token = response.token;
      if (this.token) {
        this.isAuthenticated = true;
        this.userId = response.userId;
        this.username = response.name;
        this.email = response.email;
        (response.role) ? this.role = response.role : this.role = null;
        this.authStatusListener.next(true);
        this.saveAuthData(this.token, this.username, this.userId, this.email, this.role);
        this.router.navigate(['/']);
      }
      return response;
    }));
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.userId = null;
    this.username = 'Guest';
    this.email = 'email';
    this.role = null;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    this.token = authInfo.token;
    this.isAuthenticated = true;
    this.username = authInfo.username;
    this.userId = authInfo.userId;
    this.email = authInfo.email;
    if (authInfo.role) {
      this.role = authInfo.role;
    }
    this.authStatusListener.next(true);
  }

  private saveAuthData(token: string, username: string, userId: string, email: string, role: number) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('userId', userId);
    localStorage.setItem('email', email);
    if (role !== null) {
      localStorage.setItem('role', String(role));
    }
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    if (localStorage.getItem('role')) {
      localStorage.removeItem('role');
    }
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    if (localStorage.getItem('role')) {
      const role = Number(localStorage.getItem('role'));
      return { token, username, userId, email, role };
    }
    if (!token) {
      return;
    }
    return { token, username, userId, email };
  }
}
