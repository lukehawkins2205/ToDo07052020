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
  signOutButtonSubject = new Subject<boolean>();
  errorMessage: string;
  errorFire = new Subject<string>();



  authListener = this.afAuth.onAuthStateChanged(firebaseUser => {

    if(firebaseUser){

      this.user = new User(firebaseUser.email, firebaseUser.uid);
      console.log('User logged in: ', this.user.email);
      this.insertUserDatatoDB(this.user);
      this.userSubject.next(firebaseUser);
      this.signOutButtonSubject.next(true);
      this.router.navigate(['/collections']);

    }else{

      this.user = null;
      this.router.navigate(['/auth']);
      console.log('User signed out: ', firebaseUser);
    }
  })


  signUp(email: string, password: string){
  const signUpPromise = this.afAuth.createUserWithEmailAndPassword(email, password);
  signUpPromise.catch(error => {this.errorFire.next(error); console.log(error)}); 
  
  }

  signIn(email: string, password: string){
    const signInPromise = this.afAuth.signInWithEmailAndPassword(email, password);
    signInPromise.catch(error => {this.errorFire.next(error); console.log(error.message);});
    
  }


  LogOut(){
    this.afAuth.signOut(); 
  }


  insertUserDatatoDB(user: User){
    return this.FireStoreDB.doc(`Users/${user.uid}`)
    .set({
      email: user.email
    })
  }
  


}





































