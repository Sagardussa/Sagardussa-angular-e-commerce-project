import { Component, OnInit } from '@angular/core';
import { loginForm } from 'src/app/types/auth';
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component( {
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
} )
export class RegisterComponent implements OnInit {
  constructor( private authService: AuthService, private router: Router ) {

  }
  form: loginForm = {
    email: "",
    password: "",
    confirmPassword: ""
  }
  ismatchPassowrd: boolean = true

  submit() {
    this.authService.registerUser( this.form )
  }
  ngOnInit(): void {
    this.authService.reloadUser();
  }


  isLoading() {
    // return this.authService.isLoading
  }
  openToLogin() {
    this.router.navigate( [ 'login' ] )
  }

}
