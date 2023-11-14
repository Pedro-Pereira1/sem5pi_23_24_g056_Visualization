import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
