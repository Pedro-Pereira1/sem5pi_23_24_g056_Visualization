import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShortestPathService {
  private shortestPathUrl = "http://localhost:5000/shortestPath"

  constructor(private http: HttpClient) { }

  getShortestPath(x1: number, y1: number, floor1Id: number, x2: number, y2: number, floor2Id: number): Observable<string>{
    const url = this.shortestPathUrl + "/" + "/" + x1 + "/" + y1 + "/" + floor1Id + "/" + x2 + "/" + y2 + "/" + floor2Id;
    return this.http.get<string>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `An error occurred: ${error.error.message}`;
          return errorMessage;
        } else {
          errorMessage = `An error occurred: ${error.error}`;
          return errorMessage;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}
