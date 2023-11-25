import { Component, OnInit } from '@angular/core';
import { productList } from '../types/product';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component( {
  selector: 'app-user-update-product',
  templateUrl: './user-update-product.component.html',
  styleUrls: [ './user-update-product.component.css' ]
} )
export class UserUpdateProductComponent implements OnInit {
  addProducts: productList = {
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
    id: 0
  }
  ProductData: undefined | productList

  showUpdatemsg: undefined | string = ""

  constructor( private router: Router, private route: ActivatedRoute, private productService: ProductService ) { }

  ngOnInit(): void {
    let getId = this.route.snapshot.paramMap.get( "id" )
    getId && this.productService.getProduct( getId ).subscribe( ( result ) => {
      this.ProductData = result;
    } )
  }
  updateproductList( data: productList ) {
    if ( this.ProductData ) {
      data.id = this.ProductData?.id
    }
    this.productService.updateProduct( data ).subscribe( ( result ) => {
      if ( result ) {
        // console.log( "result", result );
        this.showUpdatemsg = "Product is successfully update"
        setTimeout( () => {
          this.router.navigate( [ 'user-productList' ] )
        }, 3500 );
      }
    } )
    setTimeout( () => { this.showUpdatemsg = undefined; }, 3000 );
  }
}
