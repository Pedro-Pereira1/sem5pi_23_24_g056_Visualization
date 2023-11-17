import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { RobotTypeCreate } from '../domain/robotType/RobotTypeCreate';
import { RobotType } from '../domain/robotType/RobotType';

@Injectable({
  providedIn: 'root'
})
export class RobotTypeService {

  private floorsUrl = "http://localhost:4000/api/robotTypes"

  constructor(private http: HttpClient) { }

  createRobotType(robotTypeToCreate: RobotTypeCreate): Observable<RobotType> {
    const url = this.floorsUrl + "/" + "createRobotType";
    return this.http.post<RobotType>(url, robotTypeToCreate).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `An error occurred: ${error.error.message}`;
          window.alert(errorMessage);
        } else {
          errorMessage = `An error occurred: ${error.error}`;
          window.alert(errorMessage);
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  listAll(){
    const url = this.floorsUrl + "/" + "listAllRobotTypes";
    return this.http.get<RobotType[]>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `An error occurred: ${error.error.message}`;
          window.alert(errorMessage);
        } else {
          errorMessage = `An error occurred: ${error.error}`;
          window.alert(errorMessage);
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

}
