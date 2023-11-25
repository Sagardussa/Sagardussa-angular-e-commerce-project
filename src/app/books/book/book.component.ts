import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { Book } from 'src/app/types/Book';

@Component( {
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: [ './book.component.css' ]
} )
export class BookComponent implements OnInit, OnDestroy {


  @Input()
  book: Book = {} as Book
  myInterval: any = null;
  isInCart: boolean = false;


  // @Output() bookEmitter = new EventEmitter<Book>();
  constructor( private cartService: CartService ) {
    // console.log( { constructor: "constructor" } );
  }
  ngOnDestroy(): void {
    // clearInterval( this.myInterval );
    // console.log( { ngOnDestroy: "ngOnDestroy" } );
  }

  ngOnInit(): void {
    // this.myInterval = setInterval( () => {
    //   console.log( "Hello" );
    // }, 1000 )
  }
  addToCart() {
    this.isInCart = true
    this.cartService.add( this.book );
    // this.bookEmitter.emit( this.book );
  }

  removeToCart() {
    this.isInCart = !this.isInCart;
    this.cartService.remove( this.book );
    // this.bookEmitter.emit( this.book );
  }
}
