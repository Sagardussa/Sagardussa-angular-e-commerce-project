import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { productList } from '../types/product';

@Component( {
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
} )
export class HomeComponent implements OnInit {
  homeproduct: undefined | productList[]
  bestProduct: undefined | productList[]
  constructor( private productService: ProductService ) { }

  ngOnInit(): void {
    this.productService.HomeProduct().subscribe( ( data ) => {
      this.homeproduct = data;
    } )

    this.productService.bestProduct().subscribe( ( res ) => {
      this.bestProduct = res;
    } )
  }
}
