import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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
    return this.http.post<RobotType>(url, robotTypeToCreate);
  }

}
