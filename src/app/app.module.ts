import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BooksModule } from './books/books.module';
import { CartComponent } from './cart/cart.component';
import { AuthModule } from './auth/auth.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AddProductComponent } from './add-product/add-product.component';
import { HttpClientModule } from '@angular/common/http';
import { UserHomeComponent } from './user-home/user-home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserUpdateProductComponent } from './user-update-product/user-update-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

@NgModule( {
  declarations: [
    AppComponent,
    CartComponent,
    HeaderComponent,
    HomeComponent,
    AddProductComponent,
    UserHomeComponent,
    UserUpdateProductComponent,
    SearchComponent,
    ProductDetailsComponent,
    CheckoutComponent,
    MyOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, FormsModule, BooksModule, AuthModule, HttpClientModule, FontAwesomeModule, NgbModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
} )
export class AppModule { }
