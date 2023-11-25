import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { productList } from '../types/product';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: [ './add-product.component.css' ]
} )
export class AddProductComponent {
  addProducts: productList = {
    name: "",
    price: "",
    category: "",
    description: "",
    image: ""
  }
  showAddmsg: undefined | string = ""

  constructor( private router: Router, private productService: ProductService ) { }

  addproduct() {
    this.productService.addNewProduct( this.addProducts ).subscribe( ( result ) => {
      if ( result ) {
        this.showAddmsg = "Product is successfully added"
        setTimeout( () => {
          this.router.navigate( [ 'user-productList' ] )
        }, 3500 );
      }
    } )
    setTimeout( () => { this.showAddmsg = undefined; }, 3000 );
  }
}
