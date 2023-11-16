import { Component, OnInit } from '@angular/core';
import { BuildingService } from '../services/building.service';
import { FloorService } from '../services/floor.service';
import { FloorCreate } from '../domain/floor/FloorCreate';
import { Floor } from '../domain/floor/Floor';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-floors',
  templateUrl: './floors.component.html',
  styleUrls: ['./floors.component.css'],
  providers: [BuildingService,FloorService]
})
export class FloorsComponent implements OnInit{
  constructor(private floorService: FloorService, private buildingService:BuildingService) { }
  

  createForm = new FormGroup({
    floorID: new FormControl(0),
    floorNumber: new FormControl(0),
    floorDescription: new FormControl(''),
    buildingCode: new FormControl(''),
  })

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

  onSubmint() {
    const floor: FloorCreate = {
      floorId: this.createForm.value.floorID!,
      floorNumber: this.createForm.value.floorNumber!,
      floorDescription: this.createForm.value.floorDescription!,
      buildingCode: this.createForm.value.buildingCode!,
    }
    this.floorService.createFloor(floor).subscribe(
      (data: Floor) => {
        window.alert("Floor " + floor.floorId + " created successfully");
        this.createForm.reset();
      },
      (error: Floor) => {
        console.error('Error:', error);
        this.createForm.reset();
      }
    );
  }

}
