import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';

import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ManagementGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuth = this.authService.getIsAuth();
    const role = this.authService.getRole();
    if (!isAuth || role !== 1) {
      this.router.navigate(['/']);
    }
    return true;
  }

}
