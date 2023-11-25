import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { productList } from '../types/product';

@Component( {
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.css' ]
} )
export class HeaderComponent implements OnInit {
  menuType: string = "default"
  userName: string = "";
  searchResult: undefined | productList[];
  cartItems = 0;
  orderData = 0
  constructor( private router: Router, private productService: ProductService ) {

  }
  ngOnInit(): void {
    this.router.events.subscribe( ( val: any ) => {
      if ( val.url ) {
        if ( localStorage.getItem( "user" ) && val.url.includes( '' ) ) {
          this.menuType = ""
          if ( localStorage.getItem( "user" ) ) {
            let userStore = localStorage.getItem( "user" )
            let userData = userStore && JSON.parse( userStore )
            this.userName = userData.email.slice( 0, 10 )
            this.productService.getCartList( userData.id );
          }
        } else {
          this.menuType = "default"
        }
      }
    } )
    let cartData = localStorage.getItem( 'localCart' );
    if ( cartData ) {
      this.cartItems = JSON.parse( cartData ).length
    }
    this.productService.cartData.subscribe( ( item ) => {
      this.cartItems = item.length
    } )
    this.productService.getorderList().subscribe( ( data ) => {
      this.orderData = data.length
      console.log( "orderData", this.orderData );

    } )
  }

  searchProduct( query: any ) {
    if ( query ) {
      const element = query.target as HTMLInputElement;
      // console.log( "elemnet", element.value );
      this.productService.searchProduct( element.value ).subscribe( ( result ) => {
        // console.log( "res", result );
        if ( result.length > 5 ) {
          result.length = 5;
        }
        this.searchResult = result
      } )
    }
  }
  hideSearch() {
    this.searchResult = undefined
  }

  submitSearchInput( value: string ) {
    this.router.navigate( [ `search/${ value }` ] )
  }

  logOut() {
    localStorage.removeItem( "user" )
    this.router.navigate( [ '' ] )
    this.productService.cartData.emit( [] );
  }
  redirectToDetails( id: any ) {
    this.router.navigate( [ `/details/${ id }` ] )
  }

}
