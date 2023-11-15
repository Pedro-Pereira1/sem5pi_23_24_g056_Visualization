import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Floor } from 'src/app/domain/floor/Floor';
import { FloorCreate } from 'src/app/domain/floor/FloorCreate';
import { FloorEdit } from 'src/app/domain/floor/FloorEdit';
import { BuildingService } from 'src/app/services/building.service';
import { FloorService } from 'src/app/services/floor.service';

@Component({
  selector: 'app-floor-edit',
  templateUrl: './floor-edit.component.html',
  styleUrls: ['./floor-edit.component.css'],
  providers: [FloorService]
})
export class FloorEditComponent {
  constructor(private floorService: FloorService, private buildingService:BuildingService) { }
  id: string = "";
  floors: any[] = [];
  buildings: any[] = [];

  index: number = 0;
  expanded: boolean[] = [false];

  editForm = new FormGroup({
    floorId: new FormControl(0),
    floorNumber: new FormControl(0),
    description: new FormControl(''),
  })

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

  toggleExpansion(index: number, floor: Floor) {
    this.expanded[index] = !this.expanded[index];
    if (this.expanded[index]) {
      this.editForm.patchValue({
        floorId: floor.floorId,
        floorNumber: floor.floorNumber,
        description: floor.floorDescription,
      })
    }
  }

  save() {
    const floor: FloorEdit = {
      floorId: this.editForm.value.floorId!,
      floorNumber: this.editForm.value.floorNumber!,
      floorDescription: this.editForm.value.description!,
    }

    this.floorService.editFloor(floor).subscribe(
      (data: Floor) => {
        window.alert("Floor " + data.floorId + " edited successfully!")
        this.update()
      }
    );
  }

  update() {
    this.floors = []
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

}
