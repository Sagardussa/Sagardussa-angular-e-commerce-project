import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { productList } from '../types/product';
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons"

@Component( {
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: [ './user-home.component.css' ]
} )
export class UserHomeComponent implements OnInit {
  productList: undefined | productList[];
  productMessage: undefined | string = ""
  icon = faTrash
  iconEdit = faEdit

  constructor( private productService: ProductService ) {
  }
  ngOnInit(): void {
    this.getList()
  }

  getList() {
    this.productService.getProductList().subscribe( ( result ) => {
      this.productList = result;
    } )
  }

  deleteProduct( id: any ) {
    this.productService.deleteProduct( id ).subscribe( ( result ) => {
      this.productMessage = "Product is delete"
      this.getList();
    } )
    setTimeout( () => { this.productMessage = undefined; }, 3000 );

  }

}
