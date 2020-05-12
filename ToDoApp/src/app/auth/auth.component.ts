import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireModule } from "@angular/fire";
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { ɵTestingCompiler, TestBed } from '@angular/core/testing';






@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {


  constructor(private authService: AuthService) {}
  ngOnInit(): void {

    this.Form = new FormGroup({
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });

  }


  
  

  Form: FormGroup;
  btnSignUp: boolean;


    onLoginType(loginType: string){
      if(loginType === 'signup')
      {
        this.btnSignUp = true;
      }else{
        this.btnSignUp = false;
      }
    }
      
    onSubmit(){
      if(this.btnSignUp){
        this.authService.signUp(this.Form.value.email, this.Form.value.password);
      }else{
        this.authService.signIn(this.Form.value.email, this.Form.value.password);
      }
    }
        





    

    
  
  
  
  
  
  
  
  
  
  
}































  /*

  import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';


  Form: FormGroup;
  btnSignUp: boolean;
  errorAlert: string = null;


  constructor(private AuthService: AuthService) { }


  ngOnInit(): void {
    this.Form = new FormGroup({
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }


  onLoginType(loginType: string){
    if(loginType === 'signup')
    {
      this.btnSignUp = true;
    }else{
      this.btnSignUp = false;
    }
  }


  onSubmit(){
    if(this.btnSignUp){
      this.AuthService.SignUp(this.Form.value.email, this.Form.value.password);
    }else{
      this.AuthService.SignIn(this.Form.value.email, this.Form.value.password);
    }
   // this.Form.reset();
  }

  showErrorAlert(){
    this.errorAlert = 'You have a problambo my friend';
  }

}*/
