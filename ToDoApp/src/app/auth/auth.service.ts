import { Injectable } from '@angular/core';
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

}
