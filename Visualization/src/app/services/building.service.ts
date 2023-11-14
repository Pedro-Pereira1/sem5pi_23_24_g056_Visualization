import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BuildingCreate } from '../domain/building/BuildingCreate';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  private buildingsUrl = "http://localhost:4000/api/buildings"

  constructor(private http: HttpClient) { }

  createBuilding(building: BuildingCreate) {
    const url = this.buildingsUrl + "/" + "createBuilding";
    

    return this.http.post(url, building);
  }

  listBuildingMaxMinFloors(max: number, min: number) {
    const url = this.buildingsUrl + "/" + "listBuildingsMaxMinFloors" + "/" + max + "/" + min;
    return this.http.get(url);
  }

}
