import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { productList } from '../types/product';

@Component( {
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.css' ]
} )
export class SearchComponent implements OnInit {
  constructor( private route: ActivatedRoute, private product: ProductService ) { }

  searchResult: undefined | productList[];
  ngOnInit(): void {
    let getquery = this.route.snapshot.paramMap.get( "query" )
    // console.log( "getquery", getquery )
    getquery &&
      this.product.searchProduct( getquery ).subscribe( ( result ) => {
        // console.log( "result", result );

        this.searchResult = result;


      } )

  }
}
