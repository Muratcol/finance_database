import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { Injectable } from '@angular/core'


@Injectable()


export class LoginGuard implements CanActivate {
    constructor(
        private userService:UserService,
        private router:Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {

        if (this.userService.isLoggedIn) {
            return true
        }              
        else {
            this.router.navigate(['/user/login']);
            return false
        }  
    }    
}