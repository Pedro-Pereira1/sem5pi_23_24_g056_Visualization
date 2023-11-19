import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ElevatorCreate from '../domain/elevator/ElevatorCreate';
import Elevator from '../domain/elevator/Elevator';
import { Observable, catchError, throwError } from 'rxjs';
import { ElevatorEdit } from '../domain/elevator/ElevatorEdit';
import ElevatorList from '../domain/elevator/ElevatorList';

@Injectable({
  providedIn: 'root'
})
export class ElevatorService {
  private elevatorUrl = "http://localhost:4000/api/elevators"
  
  constructor(private http: HttpClient) { }

  createElevator(elevatorToCreate: ElevatorCreate): Observable<Elevator>{
    const url = this.elevatorUrl + "/" + "create";
    return this.http.post<Elevator>(url, elevatorToCreate).pipe(
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

  editElevator(elevatorToEdit: ElevatorEdit): Observable<Elevator>{
    const url = this.elevatorUrl + "/" + "edit";
    return this.http.put<Elevator>(url, elevatorToEdit).pipe(
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

  listElevatorsInBuilding(buildingCode: string): Observable<ElevatorList[]>{
    const url = this.elevatorUrl + "/" + "listInBuilding" + "/" + buildingCode;
    return this.http.get<ElevatorList[]>(url).pipe(
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
