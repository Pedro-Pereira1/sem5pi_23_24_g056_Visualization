import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Floor } from '../domain/floor/Floor';
import { FloorCreate } from '../domain/floor/FloorCreate';

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

}
