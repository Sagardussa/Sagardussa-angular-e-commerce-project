import { EventEmitter, Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { loginForm } from '../types/auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable( {
  providedIn: 'root'
} )
export class AuthService {
  private _registerUrl = "http://localhost:3000/register";
  // isAuthenicated: boolean = false;
  isloginError = new EventEmitter<boolean>( false )
  isLoading: boolean = false;
  ismatchPassowrd: boolean = true

  isAuthenicat = new BehaviorSubject<boolean>( false )

  constructor( private router: Router, private http: HttpClient ) { }




  registerUser( user: loginForm ) {
    this.http.post( this._registerUrl, user, { observe: 'response' } ).subscribe( ( result ) => {
      this.isAuthenicat.next( true )
      localStorage.setItem( 'user', JSON.stringify( result.body ) )
      this.router.navigate( [ 'login' ] )
    } )
  }

  reloadUser() {
    if ( localStorage.getItem( 'user' ) ) {
      this.isAuthenicat.next( true )
      this.router.navigate( [ "login" ] )
    }
  }

  userAuthReload() {
    if ( localStorage.getItem( 'user' ) ) {
      this.router.navigate( [ '/' ] );
    }
  }

  userLogin( data: loginForm ) {
    this.http.get( `http://localhost:3000/register?email=${ data.email }&password=${ data.password }`, { observe: "response" } ).subscribe( ( result: any ) => {
      if ( result && result.body && result.body.length ) {
        // alert( "Yeahhh login success " )
        localStorage.setItem( 'user', JSON.stringify( result.body[ 0 ] ) )
        this.router.navigate( [ '' ] )
        this.isloginError.emit( false );
      }
      else {
        // alert( "Credential does not match our record " )
        this.isloginError.emit( true );
      }

    } )
  }


}
