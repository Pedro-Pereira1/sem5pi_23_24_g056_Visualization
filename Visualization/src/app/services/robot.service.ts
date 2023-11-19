import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RobotCreate } from '../domain/robot/RobotCreate';
import { Robot } from '../domain/robot/Robot';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RobotService {
  private robotUrl = "http://localhost:4000/api/robots"

  constructor(private http: HttpClient) { }

  listAllRobots() {
    const url = this.robotUrl + "/" + "listAll";
    return this.http.get<Robot[]>(url).pipe(
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

  createRobot(robotToCreate: RobotCreate): Observable<Robot> {
    const url = this.robotUrl + "/" + "createRobot";
    return this.http.post<Robot>(url, robotToCreate).pipe(
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

  public inhibitRobot(robotId: string): Observable<Robot> {
    const url = this.robotUrl + "/" + "inhibitRobot";
    return this.http.patch<Robot>(url, {id: robotId});
  }

}
