import {AuthServiceService} from './auth-service.service';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {MatSnackBar} from "@angular/material";

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private router: Router, private authService: AuthServiceService,private snackBar:MatSnackBar) {}
  auth_data;
  data;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    this.auth_data = this.authService.getUser();
    if (this.auth_data !== undefined) {
      return true;
    }
    this.snackBar.open('Please Sign In..', 'X', {
      duration: 5000,
    });
    this.router.navigate(['']);
    return false;

  }
}
