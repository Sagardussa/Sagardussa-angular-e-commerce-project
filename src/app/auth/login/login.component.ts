import { Component, OnInit } from '@angular/core';
import { loginForm } from 'src/app/types/auth';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { cart, productList } from 'src/app/types/product';
import { ProductService } from 'src/app/services/product.service';

@Component( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
} )
export class LoginComponent implements OnInit {
  ErrorDisplay: any = ""

  constructor( private authService: AuthService, private router: Router, private productService: ProductService ) {

  }
  ngOnInit(): void {
    this.authService.userAuthReload();
  }

  // isLoading: boolean = false;

  form: loginForm = {
    email: "",
    password: "",
  }

  submit() {
    this.ErrorDisplay = ""
    this.authService.userLogin( this.form )
    this.authService.isloginError.subscribe( ( error ) => {
      if ( error ) {
        this.ErrorDisplay = "Email or password is not correct"
      } else {
        this.localCartToRemoteCart();
      }
    } )
  }

  isLoading() {
    return this.authService.isLoading
  }
  openToRegister() {
    this.router.navigate( [ 'register' ] )
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem( 'localCart' );
    let user = localStorage.getItem( 'user' );
    let userId = user && JSON.parse( user ).id
    if ( data ) {
      let cartDataList: productList[] = JSON.parse( data );

      cartDataList.forEach( ( product: productList, index ) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId
        }
        delete cartData.id

        setTimeout( () => {
          this.productService.AddToCart( cartData ).subscribe( ( result ) => {
            if ( result ) {
              console.warn( "data is stored in DB" );
            }
          } )
        }, 500 );
        if ( cartDataList.length === index + 1 ) {
          localStorage.removeItem( 'localCart' )
        }
      } );
    }
    setTimeout( () => {
      this.productService.getCartList( userId )
    }, 2000 );
  }

}
