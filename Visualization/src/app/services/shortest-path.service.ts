import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import ShortestPath from '../domain/path/ShortestPath';

@Injectable({
  providedIn: 'root'
})
export class ShortestPathService {
  private shortestPathUrl = "http://localhost:7000/shortestPath"

  constructor(private http: HttpClient) { }

  getShortestPath(roomNameOrig: string, roomNameDest:string): Observable<ShortestPath>{
    const url = this.shortestPathUrl + "?origem=" + roomNameOrig + "&destino=" + roomNameDest;
    return this.http.get<ShortestPath>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `An error occurred: ${error.error.message}`;
        } else {
          errorMessage = `An error occurred: ${error.error}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      }));
  }
}
