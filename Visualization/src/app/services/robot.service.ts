import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RobotCreate } from '../domain/robot/RobotCreate';
import { Robot } from '../domain/robot/Robot';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RobotService {
  private robotUrl = "http://localhost:4000/api/robots"

  constructor(private http: HttpClient) { }

  listAllRobots() {
    const url = this.robotUrl + "/" + "listAll";
    return this.http.get(url);
  }

  createRobot(robotToCreate: RobotCreate): Observable<Robot> {
    const url = this.robotUrl + "/" + "createRobot";
    return this.http.post<Robot>(url, robotToCreate);
  }
}
