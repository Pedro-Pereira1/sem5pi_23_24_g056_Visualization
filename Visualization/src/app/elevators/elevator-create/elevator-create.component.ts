import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import Elevator from 'src/app/domain/elevator/Elevator';
import ElevatorCreate from 'src/app/domain/elevator/ElevatorCreate';
import { BuildingService } from 'src/app/services/building.service';
import { ElevatorService } from 'src/app/services/elevator.service';
import { FloorService } from 'src/app/services/floor.service';

@Component({
  selector: 'app-elevator-create',
  templateUrl: './elevator-create.component.html',
  styleUrls: ['./elevator-create.component.css'],
  providers: [ElevatorService, FloorService, BuildingService]
})
export class ElevatorCreateComponent {
  constructor(
    private elevatorService: ElevatorService,
    private floorService: FloorService,
    private buildingService: BuildingService
  ) { }

  floors: any[] = [];
  buildings: any[] = [];


  createForm = new FormGroup({
    id: new FormControl(0),
    brand: new FormControl(""),
    description: new FormControl(""),
    model: new FormControl(""),
    serialNumber: new FormControl(""),
    buildingCode: new FormControl(""),
    floorsIds: new FormArray([])});


  ngOnInit() {
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

  onBuildingSelect() {
    if (this.createForm.value.buildingCode !== null) {
      this.listAllFloors();
    }
  }

  listAllFloors() {
    this.floorService.listAllFloors(this.createForm.value.buildingCode!).subscribe(
      (data: any) => {
        this.floors = data;
      },
      (error: any) => {
        window.alert('Error:' + error.error.message);
        this.floors = [];
      }
    );
  }

  updateFloors(id: number, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    let floorsIds = this.createForm.get('floorsIds') as FormArray;
    if (checkbox.checked) {
      floorsIds.push(new FormControl(id));
    } else {
      let index = floorsIds.controls.findIndex(control => control.value === id);
      if (index > -1){
        floorsIds.removeAt(index);
      }
    }
  }

  onSubmit() {
    const elevator: ElevatorCreate = {
      elevatorId: this.createForm.value.id!,
      elevatorBrand: this.createForm.value.brand!,
      elevatorDescription: this.createForm.value.description!,
      elevatorModel: this.createForm.value.model!,
      elevatorSerialNumber: this.createForm.value.serialNumber!,
      buildingCode: this.createForm.value.buildingCode!,
      floorIds: this.createForm.value.floorsIds!
    }

    this.elevatorService.createElevator(elevator).subscribe((e: Elevator) => {
      window.alert("Elevator " + e.elevatorId + " created successfully");
    })
    this.createForm.reset();

    (this.createForm.get('floorsIds') as FormArray).clear();
  }


}
