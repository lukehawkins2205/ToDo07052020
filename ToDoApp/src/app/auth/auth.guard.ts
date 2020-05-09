/*import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{

    constructor(private AuthService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): 
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> 
    {
        return this.AuthService.user.pipe(map(
            user => {
                const isAuth = !!user; //coverts a truish value, like object something thats not null.. to boolean true.
                 if (isAuth){
                     return true;
                    } 
                    return this.router.createUrlTree(['/auth'])}))
    }
}*/