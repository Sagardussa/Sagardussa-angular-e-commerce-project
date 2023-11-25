import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary, productList } from '../types/product';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: [ './cart.component.css' ]
} )
export class CartComponent implements OnInit {


  currentCartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  // cartData: productList | undefined;
  removeCart: boolean = false;


  constructor( private productService: ProductService, private router: Router ) {
  }
  ngOnInit(): void {
    this.loadDetails();
  }

  removeTocart( cardId: number | undefined ) {
    cardId &&
      this.currentCartData &&
      this.productService.removeToCart( cardId ).subscribe( () => this.loadDetails() )
  }

  loadDetails() {
    this.productService.currentCart().subscribe( ( cartData ) => {
      this.currentCartData = cartData;
      let price = 0;
      cartData.forEach( ( item ) => {
        if ( item.quantity ) {
          price = price + ( +item.price * +item.quantity )
        }
      } );
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + ( price / 10 ) + 100 - ( price / 10 );

      if ( !this.currentCartData?.length ) {
        this.router.navigate( [ '/' ] )
      }
    } )

  }
  checkOut() {
    this.router.navigate( [ 'checkout' ] )
  }
}
