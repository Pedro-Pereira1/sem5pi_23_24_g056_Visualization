import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  private buildingsUrl = "http://localhost:4000/api/buildings"

  constructor(private http: HttpClient) { }

  listBuildingMaxMinFloors(max: number, min: number) {
    const url = this.buildingsUrl + "/" + "listBuildingsMaxMinFloors" + "/" + max + "/" + min;
    return this.http.get(url);
  }

  listAll() {
    const url = this.buildingsUrl + "/" + "listAllBuildings";
    return this.http.get(url);
  }

}
