import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BuildingCreate } from '../domain/building/BuildingCreate';
import { Building } from '../domain/building/Building';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  private buildingsUrl = "http://localhost:4000/api/buildings"

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      window.alert('An error occurred: ' + error.error.message);

    } else {

      window.alert('Backend returned code ' + error.status + ', body was: ' + error.error.message);
    }

    return throwError(() => new Error(error.error.message));
  }

  public createBuilding(buildingToCreate: BuildingCreate): Observable<Building> {
    const url = this.buildingsUrl + "/" + "createBuilding";
    
    return this.http.post<Building>(url, buildingToCreate)
    .pipe(
      catchError(this.handleError)
    )
  }

  listBuildingMaxMinFloors(max: number, min: number) {
    const url = this.buildingsUrl + "/" + "listBuildingsMaxMinFloors" + "/" + max + "/" + min;
    return this.http.get(url);
  }

}
