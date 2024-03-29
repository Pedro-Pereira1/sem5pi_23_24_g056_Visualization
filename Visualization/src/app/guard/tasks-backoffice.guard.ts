import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksBackofficeGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthServiceService
  ) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (localStorage.getItem('token')) {
      if (this.authService.getRoleByToken(this.authService.getToken()!) === 'TaskManager') {
        return true;
      } else {
        alert('You do not have permission to access this page');
        this.router.navigate(['home']);
        return false;
      }
    }

    this.router.navigate(['auth/login']);
    return false;
  }
};

