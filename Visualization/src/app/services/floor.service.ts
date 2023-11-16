import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Floor } from '../domain/floor/Floor';
import { FloorCreate } from '../domain/floor/FloorCreate';
import { FloorEdit } from '../domain/floor/FloorEdit';
import {FloorList} from "../domain/floor/FloorList";
import { LoadFloorMap } from '../domain/floor/LoadFLoorMap';

@Injectable({
  providedIn: 'root'
})
export class FloorService {

  private floorsUrl = "http://localhost:4000/api/floors"

  constructor(private http: HttpClient) { }

  listAllFloors(id: string) {
    const url = this.floorsUrl + "/" + "listAllFloors" + "/" + id;
    return this.http.get(url).pipe(
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

  createFloor(floorToCreate: FloorCreate): Observable<Floor> {
    const url = this.floorsUrl + "/" + "createFloor";
    return this.http.post<Floor>(url, floorToCreate).pipe(
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

  editFloor(floorToEdit: FloorEdit): Observable<Floor> {
    const url = this.floorsUrl + "/" + "editFloor";
    return this.http.put<Floor>(url, floorToEdit).pipe(
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

  loadFloorMap(loadFloorMap: LoadFloorMap): Observable<Floor> {
    const url = this.floorsUrl + "/" + "loadFloorMap";
    return this.http.patch<Floor>(url, loadFloorMap)
    .pipe(
      catchError(this.handleError)
    )
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      window.alert('An error occurred: ' + error.error.message);

    } else {

      window.alert('Backend returned code ' + error.status + ', body was: ' + error.statusText);
    }

    return throwError(() => new Error(error.error.message));
  }

  listFloorsPassageway(id: string):Observable<FloorList[]>{
    const url = this.floorsUrl + "/" + "listFloorsPassageways" + "/" + id;
    return this.http.get<FloorList[]>(url)
      .pipe(
        catchError(this.handleError)
      )
  }
}
