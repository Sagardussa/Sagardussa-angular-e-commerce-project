import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserUpdateProductComponent } from './user-update-product/user-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const routes: Routes = [
  // { path: 'user-productList', component: BooksComponent, canActivate: [ AuthGuard ] },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, },
  { path: 'user-addproduct', component: AddProductComponent, canActivate: [ AuthGuard ] },
  { path: 'cart', component: CartComponent },
  { path: 'user-productList', component: UserHomeComponent, canActivate: [ AuthGuard ] },
  { path: 'user-update-productList/:id', component: UserUpdateProductComponent, canActivate: [ AuthGuard ] },
  { path: 'search/:query', component: SearchComponent, },
  { path: 'details/:productId', component: ProductDetailsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'my-order', component: MyOrdersComponent },



];

@NgModule( {
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule { }
