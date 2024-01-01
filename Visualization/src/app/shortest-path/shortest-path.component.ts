import { Component } from '@angular/core';
import { BuildingService } from '../services/building.service';
import { FloorService } from '../services/floor.service';
import { Building } from '../domain/building/Building';
import { ShortestPathService } from '../services/shortest-path.service';
import { RoomService } from '../services/room.service';
import RoomList from '../domain/room/RoomList';
import ShortestPath from '../domain/path/ShortestPath';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-shortest-path',
  templateUrl: './shortest-path.component.html',
  styleUrls: ['./shortest-path.component.css'],
  providers: [BuildingService, FloorService, ShortestPathService]
})
export class ShortestPathComponent {

  constructor(
    private buildingService: BuildingService,
    private roomsService: RoomService,
    private shortest_path: ShortestPathService
  ) { }

  buildings: Building[] = []
  building1Code: string = ""
  building2Code: string = ""

  roomNameOrig: string = ""
  roomNameDest: string = ""
  rooms1: RoomList[] = []
  rooms2: RoomList[] = []

  path: ShortestPath = {} as ShortestPath
  pathToShow: string = ""

  listRooms1() {
    this.roomsService.listRoomsInBuilding(this.building1Code).subscribe(
      (data: RoomList[]) => {
        if (data) {
          this.rooms1 = data;
        } else {
          window.alert('No elevators found.');
          this.rooms1 = [];
        }
      }
    );
  }

  listRooms2() {
    this.roomsService.listRoomsInBuilding(this.building2Code).subscribe(
      (data: RoomList[]) => {
        if (data) {
          this.rooms2 = data;
        }
      },
      (error: HttpErrorResponse) => {
        window.alert(error);
        this.rooms2 = [];
      }
    );
  }

  ngOnInit() {
    this.buildingService.listAll().subscribe((buildings: Building[]) => {
      this.buildings = buildings
    })
  }


  ngOnSubmit() {
    //window.alert("Calculating path...");
    this.shortest_path.getShortestPath(this.roomNameOrig, this.roomNameDest).subscribe(
      (path: ShortestPath) => {
        if (path) {
          this.path = path;
          this.processPath(this.path);
        } else {
          window.alert("Error getting path");
        }
      }
    )
  }

  processPath(path: ShortestPath) {
    var index = 0;
    console.log(path);
    for (let i = 0; i < path.cells.length; i++) {
      this.pathToShow += "," + path.cells.at(i)!.toString()
      if (path.accPoints.length != undefined || path.accPoints.length != 0) {
        this.pathToShow +="," + path.accPoints.pop()!.toString();
        index++;
      }
    }
    console.log(this.pathToShow);
  }
}
