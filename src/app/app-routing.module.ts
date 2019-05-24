import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
import {AuthGuard} from './guards/auth.guard';

// Components
import {HomeComponent} from './components/home/home.component';
import {HomeLoginComponent} from './components/home-login/home-login.component';
import { SignupComponent } from './components/auth/signup/signup.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: HomeLoginComponent },
  { path: 'register', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
