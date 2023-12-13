import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUserDto } from '../domain/user/RegisterUserDto';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private authUrl = "https://localhost:7094/api/users"

  constructor(private httpClient: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error.message));
  }

  public login(email: string, password: string) {
    const url = this.authUrl + "/" + "login"
    return this.httpClient.post<any>(url, { email: email, password: password })
      .pipe(
        map((user : string) => localStorage.setItem('token', JSON.stringify(user))),
        catchError(this.handleError)
      )
  }

  public register(dto: RegisterUserDto) {
    const url = this.authUrl
    return this.httpClient.post(url, dto)
  }

  public logout() {
    localStorage.removeItem('user')
  }

  getToken() {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).token : null
  }

}
