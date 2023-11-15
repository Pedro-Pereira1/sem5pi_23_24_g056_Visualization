import { Injectable } from '@angular/core';
import {Passageway} from "../domain/passageway/Passageway";
import {catchError} from "rxjs/operators";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {PassagewayCreate} from "../domain/passageway/PassagewayCreate";
import {PassagewayEdit} from "../domain/passageway/PassagewayEdit";
import {PassagewayList} from "../domain/passageway/PassagewayList";

@Injectable({
  providedIn: 'root'
})
export class PassagewayService {

  private passagewaysUrl = "http://localhost:4000/api/passageways"

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      window.alert('An error occurred: ' + error.error.message);

    } else {

      window.alert('Backend returned code ' + error.status + ', body was: ' + error.error.message);
    }

    return throwError(() => new Error(error.error.message));
  }

  createPassageways(passagewayToCreate: PassagewayCreate): Observable<Passageway> {
    const url = this.passagewaysUrl + "/" + "createPassageway";
    return this.http.post<Passageway>(url, passagewayToCreate)
      .pipe(
        catchError(this.handleError)
      )
  }


  editPassageways(passagewayToEdit: PassagewayEdit): Observable<Passageway> {
    const url = this.passagewaysUrl + "/" + "editPassageway";
    return this.http.put<Passageway>(url, passagewayToEdit)
      .pipe(
        catchError(this.handleError)
      )
  }

  listPassagewaysBuildings(building1: string, building2: string): Observable<PassagewayList[]> {
    const url = this.passagewaysUrl + "/" + "list" + "/" + "building1" + "/" + building1 + "/" + "building2" + "/" + building2;
    return this.http.get<PassagewayList[]>(url)
      .pipe(
      catchError(this.handleError)
    )
  }

  listAllPassageways(): Observable<PassagewayEdit[]> {
    const url = this.passagewaysUrl + "/" + "listAll";
    return this.http.get<PassagewayEdit[]>(url)
      .pipe(
        catchError(this.handleError)
      )

  }

}
