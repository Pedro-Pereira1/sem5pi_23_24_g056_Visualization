import { Component, OnInit } from '@angular/core';
import { BuildingService } from 'src/app/services/building.service';
import { FloorService } from 'src/app/services/floor.service';

@Component({
  selector: 'app-floor-list-all-floors-of-building',
  templateUrl: './floor-list-all-floors-of-building.component.html',
  styleUrls: ['./floor-list-all-floors-of-building.component.css'],
  providers: [FloorService,BuildingService]
})
export class FloorListAllFloorsOfBuildingComponent implements OnInit {
  constructor(private floorService: FloorService, private buildingService:BuildingService) { }
  id: string = "";
  floors: any[] = [];
  buildings: any[] = [];

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

  listAllFloors(){
    this.floorService.listAllFloors(this.id).subscribe(
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
