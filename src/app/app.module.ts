import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Interceptors
import { AuthInterceptor } from './interceptors/auth-interceptor';

// Components
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
import { ShopInfoComponent } from './components/partials/shop-info/shop-info.component';
import { ShopComponent } from './components/shop/shop.component';
import { OrderComponent } from './components/order/order.component';

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
    ProductComponent,
    ShopInfoComponent,
    ShopComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
