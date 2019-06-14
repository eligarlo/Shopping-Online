import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
import {AuthGuard} from './guards/auth.guard';
import {ManagementGuard} from './guards/management.guard';

// Components
import {HomeComponent} from './components/home/home.component';
import {HomeLoginComponent} from './components/home-login/home-login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import {ManagementComponent} from './components/management/management.component';
import {ShopComponent} from './components/shop/shop.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: HomeLoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'management', component: ManagementComponent, canActivate: [ManagementGuard] },
  { path: 'shop/:cartId', component: ShopComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, ManagementGuard]
})
export class AppRoutingModule { }
