import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, productList } from '../types/product';

@Component( {
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: [ './product-details.component.css' ]
} )
export class ProductDetailsComponent implements OnInit {

  productDetails: undefined | productList
  cartData: productList | undefined;
  productQuantity: number = 1
  removeCart: boolean = false

  constructor( private route: ActivatedRoute, private productService: ProductService ) {

  }
  ngOnInit(): void {
    let getProductId = this.route.snapshot.paramMap.get( "productId" )
    getProductId && this.productService.getProduct( getProductId ).subscribe( ( data ) => {
      this.productDetails = data;
      let cartData = localStorage.getItem( 'localCart' );

      if ( getProductId && cartData ) {
        let items = JSON.parse( cartData );
        items = items.filter( ( item: productList ) => getProductId === item.id?.toString() );
        if ( items.length ) {
          this.removeCart = true
        } else {
          this.removeCart = false
        }
      }

      let user = localStorage.getItem( 'user' )
      if ( user ) {
        let userId = user && JSON.parse( user ).id;
        this.productService.getCartList( userId )
        this.productService.cartData.subscribe( ( result ) => {
          let item = result.filter( ( item: productList ) => getProductId?.toString() === item.productId?.toString() )
          if ( item.length ) {
            this.cartData = item[ 0 ];
            this.removeCart = true
          }
        } )
      }
    } )
  }

  handleQuantity( val: string ) {
    if ( this.productQuantity < 20 && val === 'plus' ) {
      this.productQuantity += 1;
    } else if ( this.productQuantity > 1 && val === 'min' ) {
      this.productQuantity -= 1;
    }
  }
  AddToCart() {
    if ( this.productDetails ) {
      this.productDetails.quantity = this.productQuantity
      if ( !localStorage.getItem( 'user' ) ) {
        this.productService.localAddToCart( this.productDetails )
        this.removeCart = true
      }
      else {
        let user = localStorage.getItem( 'user' )
        let userId = user && JSON.parse( user ).id;
        let cartData: cart = {
          ...this.productDetails,
          productId: this.productDetails.id,
          userId
        }
        delete cartData.id;
        this.productService.AddToCart( cartData ).subscribe( ( result ) => {
          if ( result ) {
            alert( "Add to cart is done" )
            this.productService.getCartList( userId )
            this.removeCart = true
          }
        } )
      }
    }
  }
  removeToCart( productId: number ) {
    let user = localStorage.getItem( 'user' );
    let userId = user && JSON.parse( user ).id;
    if ( !user ) {
      this.productService.removeItemFromCart( productId );
    } else {
      this.cartData && this.productService.removeToCart( this.cartData.id ).subscribe( ( result ) => {
        if ( result ) {
          // console.log( "result", result );
          this.productService.getCartList( userId )
        }
      } )
    }
    this.removeCart = false
  }

}
