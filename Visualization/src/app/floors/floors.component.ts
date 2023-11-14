import { Component, OnInit } from '@angular/core';
import { BuildingService } from '../services/building.service';
import { FloorService } from '../services/floor.service';
import { FloorCreate } from '../domain/floor/FloorCreate';
import { Floor } from '../domain/floor/Floor';

@Component({
  selector: 'app-floors',
  templateUrl: './floors.component.html',
  styleUrls: ['./floors.component.css'],
  providers: [BuildingService,FloorService]
})
export class FloorsComponent implements OnInit{
  constructor(private floorService: FloorService, private buildingService:BuildingService) { }
  buildingCode: string = "";
  floorID: number = 0;
  FloorNumber: number = 0;
  FloorDescription: string = "";

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

  createFloor() {
    const floor: FloorCreate = {
      floorId: this.floorID,
      floorNumber: this.FloorNumber,
      floorDescription: this.FloorDescription,
      buildingCode: this.buildingCode
    }
    this.floorService.createFloor(floor).subscribe(
      (data: Floor) => {
        window.alert("Floor " + this.FloorNumber + " created successfully");
        this.floorID = 0;
        this.FloorNumber = 0;
        this.FloorDescription = "";
        this.buildingCode = "";
        
      },
      (error: Floor) => {
        console.error('Error:', error);
      }
    );
  }

}
