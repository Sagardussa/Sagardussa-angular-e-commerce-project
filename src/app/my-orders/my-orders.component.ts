import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { orderdetail } from '../types/product';

@Component( {
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: [ './my-orders.component.css' ]
} )
export class MyOrdersComponent implements OnInit {
  images = "../assets/cartimage.jpg"
  orderData: any | undefined

  constructor( private productService: ProductService ) {

  }

  ngOnInit(): void {
    this.getOrderDataList();
  }

  cancelOrder( orderId: number ) {
    orderId && this.productService.cancelOrder( orderId ).subscribe( ( data ) => {
      if ( data ) {
        this.getOrderDataList();
      }
    } )

  }

  getOrderDataList() {
    this.productService.getorderList().subscribe( ( data ) => {
      this.orderData = data
    } )
  }

}
