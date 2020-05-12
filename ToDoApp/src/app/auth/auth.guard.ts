import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{

    constructor(private authService: AuthService, private router: Router, private FireStoreDB: AngularFirestore, private afAuth: AngularFireAuth ){}


    


    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): 
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> 
    {
        return this.afAuth.authState.pipe(map((user) => !!user),
        tap((loggedIn) => {
            if(!loggedIn){
                this.router.navigate(['/auth'])
            }
        }))
    }
            

}
                    