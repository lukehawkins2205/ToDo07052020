import { Injectable, OnInit } from '@angular/core';
import { User } from './user.model';
import { throwError, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { promise } from 'protractor';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private FireStoreDB: AngularFirestore, private afAuth: AngularFireAuth, private router: Router) {}

  userSubject = new Subject<User>();
  user: User;
  showButtonSubject = new Subject;



  authListener = this.afAuth.onAuthStateChanged(firebaseUser => {

    if(firebaseUser){

      this.user = new User(firebaseUser.email, firebaseUser.uid);
      console.log('User logged in: ', this.user.email);
      this.insertUserDatatoDB(this.user);
      this.userSubject.next(firebaseUser);
      this.router.navigate(['/collections']);

    }else{

      this.user = null;
      this.router.navigate(['/auth']);
      console.log('User signed out: ', firebaseUser);
    }
  })


  
 

  signUp(email: string, password: string){
  const signUpPromise = this.afAuth.createUserWithEmailAndPassword(email, password);
  signUpPromise.catch(error => console.log(error.message));
  }

  signIn(email: string, password: string){
    const signInPromise = this.afAuth.signInWithEmailAndPassword(email, password);
    signInPromise.catch(error => console.log(error.message));
  }


  LogOut(){
    this.afAuth.signOut(); 
  }

  //ngOnDrestroy(){showbutton.unsubscribe()}


  insertUserDatatoDB(user: User){
    return this.FireStoreDB.doc(`Users/${user.uid}`)
    .set({
      email: user.email
    })
  }
  

  /*handleAuth(email: string, uid: string){
    const userData = new User(email, uid);
    this.afAuth.onAuthStateChanged(firebaseUser => {console.log(firebaseUser)})
    //this.user.next(user);
    this.insertUserDatatoDB(userData).then(() => {
      this.router.navigate(['/todo'])}).catch(error => {console.log(error.error.error.message)})
    //localStorage.setItem('userData', JSON.stringify(userData));
  }*/

  


  /*insertUserDatatoDB(userResponseData: firebase.auth.UserCredential){
    console.log(userResponseData.user);
    return this.FireStoreDB.doc(`Users/${userResponseData.user.uid}`).set({
      email: userResponseData.user.email
    })
  }*/

}















































/*import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './user.model';
import { Router } from '@angular/router';
import { throwError, Subject } from 'rxjs';
import {tap} from 'rxjs/operators'

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}



@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user = new Subject<User>();


  constructor(private http: HttpClient, private router: Router) { }
  


  SignUp(Email: string, Password: string){

   this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDgRBnpvhYR2G4Umjt9syEj4Zy8gOlXNf8',
     {email: Email, password: Password, returnSecureToken: true}).pipe(
      tap(responseData => {this.handleAuth(
          responseData.email, responseData.localId, responseData.idToken, responseData.expiresIn)},
       error => this.handleError(error)))
      .subscribe(
     () => {this.router.navigate(['/todo'])},
       error => this.handleError(error))
    }


  SignIn(Email: string, Password: string){

    this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDgRBnpvhYR2G4Umjt9syEj4Zy8gOlXNf8',
     {email: Email, password: Password, returnSecureToken: true}).pipe(
      tap(responseData => {this.handleAuth(
          responseData.email, responseData.localId, responseData.idToken, responseData.expiresIn)},
       error => this.handleError(error)))
      .subscribe(
     (responseData) => {console.log('user should nav to /todo', responseData.email); this.router.navigate(['/todo'])},
       error => this.handleError(error))
  }

  handleAuth(email: string, localId: string, idToken: string, expiresIn: any){
    const user = new User(email, localId, idToken, expiresIn);
    console.log('user has logged in!', user)
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  handleError(errorRes: HttpErrorResponse){
    console.log(errorRes.error.error.message);
  }

}*/
