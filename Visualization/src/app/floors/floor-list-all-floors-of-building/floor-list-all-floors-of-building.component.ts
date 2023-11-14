import { Component, OnInit } from '@angular/core';
import { FloorService } from 'src/app/services/floor.service';

@Component({
  selector: 'app-floor-list-all-floors-of-building',
  templateUrl: './floor-list-all-floors-of-building.component.html',
  styleUrls: ['./floor-list-all-floors-of-building.component.css'],
  providers: [FloorService]
})
export class FloorListAllFloorsOfBuildingComponent implements OnInit {

  floors: any[] = [];
  buildings: any[] = [];

  ngOnInit(): void {
    this.floorService.listAllBuildings().subscribe(
      (data: any) => {
        this.buildings = data;
      },
      (error: any) => {
        console.error('Error:', error);
        this.buildings = [];
      }
    );
  }

  constructor(private floorService: FloorService) { }
  id: string = "";

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
