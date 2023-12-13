import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerifyAuthServiceService implements CanActivate {

  constructor(private authService: AuthServiceService,
    private router: Router) { }



  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }

    this.router.navigate(['auth/login']);
    return false;
  }

  isLogged(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }
}
