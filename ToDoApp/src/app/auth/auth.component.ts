import { Component, OnInit, OnDestroy } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject, Subscription } from 'rxjs';
import { AngularFireModule } from "@angular/fire";
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { ɵTestingCompiler, TestBed } from '@angular/core/testing';
import { ErrorComponent } from '../error/error.component';






@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  errorShow: boolean = false; 
  errorMessage: string;
  $error: Subscription
  


  constructor(private authService: AuthService, private errorComp: ErrorComponent) {}
  ngOnInit(): void {

   
    this.$error = this.authService.errorFire.subscribe(error => {this.errorMessage = error});
    

    this.Form = new FormGroup({
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });

  }

  

  Form: FormGroup;
  btnSignUp: boolean;


      
    onSubmit(loginType: string){
      if(loginType === 'signup')
      {
        this.authService.signUp(this.Form.value.email, this.Form.value.password);
      }else{
        this.authService.signIn(this.Form.value.email, this.Form.value.password);
      }
    }


    ngOnDestroy(){
     this.$error.unsubscribe()
    }
        





    

    
  
  
  
  
  
  
  
  
  
  
}


























