import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Floor } from '../domain/floor/Floor';
import { FloorCreate } from '../domain/floor/FloorCreate';
import { FloorEdit } from '../domain/floor/FloorEdit';
import { LoadFloorMap } from '../domain/floor/LoadFLoorMap';

@Injectable({
  providedIn: 'root'
})
export class FloorService {

  private floorsUrl = "http://localhost:4000/api/floors"

  constructor(private http: HttpClient) { }

  listAllFloors(id: string) {
    const url = this.floorsUrl + "/" + "listAllFloors" + "/" + id;
    return this.http.get(url);
  }

  createFloor(floorToCreate: FloorCreate): Observable<Floor> {
    const url = this.floorsUrl + "/" + "createFloor";
    return this.http.post<Floor>(url, floorToCreate);
  }

  editFloor(floorToEdit: FloorEdit): Observable<Floor> {
    const url = this.floorsUrl + "/" + "editFloor";
    return this.http.put<Floor>(url, floorToEdit).pipe(
      catchError(this.handleError)
    )
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

}
