import { Component, OnInit } from '@angular/core';
import { BooksService } from './books.service';
import { Book } from '../types/Book';


@Component( {
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: [ './books.component.css' ]
} )
export class BooksComponent implements OnInit {
  books: Book[] = [];
  constructor( private booksService: BooksService ) {
    // console.log( { constructor: "constructor" } );
  }
  ngOnInit(): void {
    // throw new Error( 'Method not implemented.' );
    // console.log( { ngOnInit: "ngOnInit" } );
    this.books = this.booksService.getBooks()
  }
  Myname: string = ""
  isDisabled: boolean = false;
  isShowing: boolean = true;

  handleClick() {
    // alert( "handleClick" )
    // this.isDisabled = true;
    // this.isDisabled = !this.isDisabled;
    this.isShowing = !this.isShowing
  }

}
