import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {RoomCreate} from "../domain/room/RoomCreate";
import {Room} from "../domain/room/Room";
import RoomList from '../domain/room/RoomList';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private roomsUrl = "http://localhost:4000/api/rooms"
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      window.alert('An error occurred: ' + error.error.message);

    } else {

      window.alert('Backend returned code ' + error.status + ', body was: ' + error.error.message);
    }

    return throwError(() => new Error(error.error.message));
  }

  createRoom(roomCreate: RoomCreate): Observable<Room> {
    const url = this.roomsUrl + "/" + "createRoom";
    return this.http.post<Room>(url, roomCreate)
      .pipe(
        catchError(this.handleError)
      )
  }

  listRoomsInBuilding(buildingCode: string): Observable<RoomList[]> {
    const url = this.roomsUrl + "/" + "listAllInBuilding" + "/" + buildingCode;
    return this.http.get<RoomList[]>(url).pipe(
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
