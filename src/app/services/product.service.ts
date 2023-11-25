import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { cart, orderdetail, productList } from '../types/product';

@Injectable( {
  providedIn: 'root'
} )
export class ProductService {

  private _productsUrl = "http://localhost:3000/products/";
  private _limitUrls = "http://localhost:3000/products?_limit=20";
  private _cartUrl = "http://localhost:3000/cart";
  private _orderUrl = "http://localhost:3000/orders";



  cartData = new EventEmitter<productList[] | []>();


  constructor( private http: HttpClient ) { }

  addNewProduct( data: productList ) {
    return this.http.post( this._productsUrl, data )
  }
  getProductList() {
    return this.http.get<productList[]>( this._productsUrl )
  }
  deleteProduct( id: any ) {
    return this.http.delete( `${ this._productsUrl }/${ id }` )
  }
  getProduct( id: string ) {
    return this.http.get<productList>( `${ this._productsUrl }/${ id }` )
  }
  updateProduct( product: productList ) {
    return this.http.put<productList>( `${ this._productsUrl }/${ product.id }`, product )
  }
  HomeProduct() {
    return this.http.get<productList[]>( this._limitUrls );
  }
  bestProduct() {
    return this.http.get<productList[]>( this._limitUrls );
  }
  searchProduct( query: any ) {
    return this.http.get<productList[]>( `${ this._productsUrl }?q=${ query }` );
  }

  localAddToCart( data: productList ) {
    let cartData = [];
    let localCart = localStorage.getItem( 'localCart' );
    if ( !localCart ) {
      localStorage.setItem( 'localCart', JSON.stringify( [ data ] ) );
      this.cartData.emit( [ data ] )
    }
    else {
      cartData = JSON.parse( localCart );
      cartData.push( data );
      localStorage.setItem( 'localCart', JSON.stringify( cartData ) );
      this.cartData.emit( cartData );
    }
  }

  removeItemFromCart( productId: number ) {
    let cartData = localStorage.getItem( 'localCart' );
    if ( cartData ) {
      let items: productList[] = JSON.parse( cartData );
      items = items.filter( ( item: productList ) => productId !== item.id );
      localStorage.setItem( 'localCart', JSON.stringify( items ) );
      this.cartData.emit( items );
    }
  }

  AddToCart( cartData: cart ) {
    return this.http.post( this._cartUrl, cartData )
  }

  getCartList( userId: number ) {
    return this.http.get<productList[]>( `${ this._cartUrl }?userId=${ userId }`, { observe: 'response', } ).subscribe( ( result ) => {
      if ( result && result.body ) {
        this.cartData.emit( result.body );
      }
    } )
  }

  removeToCart( cartId: number | undefined ) {
    return this.http.delete( `${ this._cartUrl }/${ cartId }` );
  }

  currentCart() {
    let userStore = localStorage.getItem( 'user' );
    let userData = userStore && JSON.parse( userStore );
    return this.http.get<cart[]>( `${ this._cartUrl }?userId=${ userData.id }` );
  }

  addOrder( cartData: orderdetail ) {
    return this.http.post( this._orderUrl, cartData )
  }

  getorderList() {
    let userStore = localStorage.getItem( 'user' );
    let userData = userStore && JSON.parse( userStore );
    return this.http.get<orderdetail[]>( ` ${ this._orderUrl }?userId=${ userData.id }` )
  }

  deleteCartItems( cartId: number ) {
    return this.http.delete( `${ this._cartUrl }/${ cartId }` ).subscribe( ( result ) => {
      this.cartData.emit( [] );
    } )
  }

  cancelOrder( orderId: number ) {
    return this.http.delete( `${ this._orderUrl }/${ orderId }` );
  }

  // RemoveCurrentCart( id: number ) {
  // console.log( "id", id );
  // return this.http.delete<cart[]>( `${ this._cartUrl }?id=${ id }` );
  // }







}
