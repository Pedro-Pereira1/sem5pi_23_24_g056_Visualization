import { Injectable } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthServiceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    
    if (token) {
      const cloned = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token).set('Access-Control-Allow-Origin', '*')});
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }


}
