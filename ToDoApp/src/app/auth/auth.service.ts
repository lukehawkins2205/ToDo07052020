import { Injectable } from '@angular/core';
import { User } from './user.model';
import { throwError, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user: User;
  getData: boolean = true;


  constructor(private FireStoreDB: AngularFirestore, private afAuth: AngularFireAuth, private router: Router) {}





  signUp(email: string, password: string){
  this.afAuth.createUserWithEmailAndPassword(email, password)
    .then(userResponseData => this.handleAuth(userResponseData.user.email, userResponseData.user.uid) )
          
       //.catch(error => console.log(error.error.error.message))
  }

  handleAuth(email: string, uid: string){
    const userData = new User(email, uid);
    console.log('user has logged in!', userData)
    //this.user.next(user);
    this.insertUserDatatoDB(userData).then(() => {
      this.router.navigate(['/todo'])}).catch(error => {console.log(error.error.error.message)})
    //localStorage.setItem('userData', JSON.stringify(userData));
  }

  insertUserDatatoDB(user: User){
    //console.log(user);
    return this.FireStoreDB.doc(`Users/${user.uid}`).set({
      email: user.email
    })
  }


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
