import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeLoginComponent } from './components/home-login/home-login.component';
import { HomeComponent } from './components/home/home.component';
import { SloganComponent } from './components/partials/slogan/slogan.component';
import { ManagementComponent } from './components/management/management.component';
import { CategoryComponent } from './components/management/category/category.component';
import { ProductComponent } from './components/management/product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    HomeLoginComponent,
    HomeComponent,
    SloganComponent,
    ManagementComponent,
    CategoryComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
