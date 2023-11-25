import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, orderdetail } from '../types/product';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: [ './checkout.component.css' ]
} )
export class CheckoutComponent implements OnInit {
  orderdetails: orderdetail = {
    email: "",
    address: "",
    contact: "",
  }
  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  orderMsg: string | undefined;

  constructor( private productService: ProductService, private router: Router ) {

  }
  ngOnInit(): void {
    this.productService.currentCart().subscribe( ( result ) => {
      let price = 0;

      this.cartData = result

      result.forEach( ( item ) => {
        if ( item.quantity ) {
          price = price + ( +item.price * +item.quantity )
        }
      } )
      this.totalPrice = price + ( price / 10 ) + 100 - ( price / 10 );

    } )

  }

  orderNow() {
    let user = localStorage.getItem( 'user' );
    let userId = user && JSON.parse( user ).id
    if ( this.totalPrice ) {
      let orderData: orderdetail = {
        ...this.orderdetails,
        totalPrice: this.totalPrice,
        userId,
        id: undefined
      }

      this.cartData?.forEach( ( item ) => {
        setTimeout( () => {
          item.id && this.productService.deleteCartItems( item.id )
        }, 600 );
      } )

      this.productService.addOrder( orderData ).subscribe( ( addOrder ) => {
        if ( addOrder ) {
          this.orderMsg = "Order has been placed";
          setTimeout( () => {
            this.orderMsg = undefined;
            this.router.navigate( [ 'my-order' ] )
          }, 4000 );
        } else {
          this.orderMsg = undefined;
        }
      } )

    }
    // console.log( "data", data );

  }



}
