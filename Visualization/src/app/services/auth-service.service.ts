import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUserDto } from '../domain/user/RegisterUserDto';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { UserDto } from '../domain/user/UserDto';
import { UserSession } from '../domain/user/UserSession';
import { CreateBackofficeUserDto } from '../domain/user/CreateBackofficeUserDto';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private authUrl = "https://localhost:7094/api/users"

  constructor(private httpClient: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logout()
      console.error(error)
      console.log(`${operation} failed: ${error.message}`)
      return of (result as T)
    }
  }

  public login(email: string, password: string): Observable<void | UserSession>{
    const url = this.authUrl + "/" + "login"
    return this.httpClient.post<UserSession>(url, { email: email, password: password })
      .pipe(
        map((user : UserSession) => localStorage.setItem('token', JSON.stringify(user.token))),
        catchError(this.handleError<UserSession>("login"))
      )
  }

  public register(dto: RegisterUserDto) {
    const url = this.authUrl
    return this.httpClient.post<UserDto>(url, dto).pipe(
      catchError(this.handleError<UserDto>("register"))
    )
  }

  public logout() {
    localStorage.removeItem('token')
  }

  public getToken(): string | null {
    return localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')!) : null
  }

  createBackofficeUser(backofficeUserToCreate: CreateBackofficeUserDto): Observable<UserDto> {
    const url = this.authUrl + "/" + "backoffice" ;
    return this.httpClient.post<UserDto>(url, backofficeUserToCreate).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `An error occurred: ${error.error.message}`;
        } else {
          errorMessage = `An error occurred: ${error.error}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}
