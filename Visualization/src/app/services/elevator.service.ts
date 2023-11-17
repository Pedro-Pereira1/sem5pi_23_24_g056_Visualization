import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ElevatorCreate from '../domain/elevator/ElevatorCreate';
import Elevator from '../domain/elevator/Elevator';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElevatorService {
  private elevatorUrl = "http://localhost:4000/api/elevators"
  
  constructor(private http: HttpClient) { }

  createElevator(elevatorToCreate: ElevatorCreate): Observable<Elevator>{
    const url = this.elevatorUrl + "/" + "create";
    return this.http.post<Elevator>(url, elevatorToCreate);
  }
}
