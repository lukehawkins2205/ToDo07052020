import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireModule } from "@angular/fire";
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';






@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  ngOnInit(): void {
    this.Form = new FormGroup({
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }

  testcontainer: number[] = [1,3,4,2]

  Form: FormGroup;

    constructor(private authService: AuthService) {}
      
    onSubmit(){
      this.authService.signUp(this.Form.value.email, this.Form.value.password)
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
