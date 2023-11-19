import { Component } from '@angular/core';
import {FloorService} from "../../services/floor.service";
import {BuildingService} from "../../services/building.service";
import {FloorList} from "../../domain/floor/FloorList";
import {Building} from "../../domain/building/Building";

@Component({
  selector: 'app-floor-list-floors-passageways',
  templateUrl: './floor-list-floors-passageways.component.html',
  styleUrls: ['./floor-list-floors-passageways.component.css']
})
export class FloorListFloorsPassagewaysComponent {

  constructor(private floorService: FloorService, private buildingService : BuildingService) { }
  id: string = "";
  floors: FloorList[] = [];
  buildings: Building[] = [];

  ngOnInit(): void {
    this.buildingService.listAll().subscribe(
      (data: any) => {
        this.buildings = data;
      },
      (error: any) => {
        console.error('Error:', error);
        this.buildings = [];
      }
    );
  }

  listFloorsPassageway(){
    this.floorService.listFloorsPassageway(this.id).subscribe(
      (data: any) => {
        this.floors = data;
      },
      (error: any) => {
        console.error('Error:', error);
        this.floors = [];
      }
    );
  }
}
