import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import Elevator from 'src/app/domain/elevator/Elevator';
import { ElevatorEdit } from 'src/app/domain/elevator/ElevatorEdit';
import ElevatorList from 'src/app/domain/elevator/ElevatorList';
import { Floor } from 'src/app/domain/floor/Floor';
import { BuildingService } from 'src/app/services/building.service';
import { ElevatorService } from 'src/app/services/elevator.service';
import { FloorService } from 'src/app/services/floor.service';

@Component({
  selector: 'app-elevator-edit',
  templateUrl: './elevator-edit.component.html',
  styleUrls: ['./elevator-edit.component.css'],
  providers: [ElevatorService, FloorService, BuildingService]
})

export class ElevatorEditComponent {
  constructor(private elevatorService: ElevatorService, private floorService: FloorService, private buildingService: BuildingService) { }
  buildingCode: string = "";
  elevators: ElevatorList[] = [];
  buildings: any[] = [];
  floors: Floor[] = [];
  floorsWithoutElevator: Floor[] = [];
  floorsWithElevator: Floor[] = [];

  index: number = 0;
  expanded: boolean[] = [false];

  editForm = new FormGroup({
    elevatorIdentificationNumber: new FormControl(0),
    elevatorBrand: new FormControl(''),
    elevatorDescription: new FormControl(''),
    elevatorModel: new FormControl(''),
    elevatorSerialNumber: new FormControl(''),
    floorsIdToAdd: new FormArray([]),
    floorsIdToRemove: new FormArray([])    
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

  listElevatorsInBuilding() {
    this.elevatorService.listElevatorsInBuilding(this.buildingCode).subscribe(
      (data: any) => {
        this.elevators = data;
      },
      (error: any) => {
        if (error.status === 400) {
          window.alert('No elevators found.');
          this.elevators = [];
        }
      }
    );
  }

  listAllFloors() {
    this.floorService.listAllFloors(this.buildingCode!).subscribe(
      (data: any) => {
        this.floors = data;
      },
      (error: any) => {
        window.alert('Error:' + error.error.message);
        this.floors = [];
      }
    );
  }

  getFloorsWithoutElevator(id: number) {
    this.floorsWithoutElevator = [];
    for (let floor of this.floors) {
      if (floor.floorMap.elevators.find(elevator => elevator === id) === undefined) {
        this.floorsWithoutElevator.push(floor);
      }
    }
  }

  getFloorsWithElevator(id: number) {
    this.floorsWithElevator = [];
    for (let floor of this.floors) {
      if (floor.floorMap.elevators.find(elevator => elevator === id)) {
        this.floorsWithElevator.push(floor);
      }
    }
  }

  toggleExpansion(index: number, elevator: Elevator) {
    this.expanded[index] = !this.expanded[index];
    if (this.expanded[index]) {
      this.editForm.patchValue({
        elevatorIdentificationNumber: elevator.elevatorIdentificationNumber,
        elevatorBrand: elevator.elevatorBrand,
        elevatorDescription: elevator.elevatorDescription,
        elevatorModel: elevator.elevatorModel,
        elevatorSerialNumber: elevator.elevatorSerialNumber
      })
    }
  }

  save() {
    const elevator: ElevatorEdit = {
      elevatorBrand: this.editForm.value.elevatorBrand!,
      elevatorDescription: this.editForm.value.elevatorDescription!,
      elevatorIdentificationNumber: this.editForm.value.elevatorIdentificationNumber!,
      elevatorModel: this.editForm.value.elevatorModel!,
      elevatorSerialNumber: this.editForm.value.elevatorSerialNumber!,
      buildingCode: this.buildingCode
    }

    if (this.editForm.value.floorsIdToAdd?.length !== 0) {
      elevator.floorsIdToAdd = this.editForm.value.floorsIdToAdd!;

    } 
    if (this.editForm.value.floorsIdToRemove?.length !== 0){
      console.log(this.editForm.value.floorsIdToRemove);
      elevator.floorsIdToRemove = this.editForm.value.floorsIdToRemove!;
    }

    console.log(elevator);
    this.elevatorService.editElevator(elevator).subscribe(
      (data: Elevator) => {
        window.alert("Elevator " + data.elevatorId + " edited successfully!")
        this.ngOnInit()
      }
    );
    this.editForm.reset();
  }

  updateFloorsToAdd(number: number, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    let floorsNumber = this.editForm.get('floorsIdToAdd') as FormArray;
    if (checkbox.checked) {
      floorsNumber.push(new FormControl(number));
    } else {
      let index = floorsNumber.controls.findIndex(control => control.value === number);
      if (index > -1){
        floorsNumber.removeAt(index);
      }
    }
  }

  updateFloorsToRemove(number: number, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    let floorsNumberToRemove = this.editForm.get('floorsIdToRemove') as FormArray;
    if (checkbox.checked) {
      floorsNumberToRemove.push(new FormControl(number));
      console.log('ola');
      //console.log('floorsNumberToRemove: ' + this.editForm.value.floorsIdToRemove);

    } else {
      let index = floorsNumberToRemove.controls.findIndex(control => control.value === number);
      if (index > -1){
        floorsNumberToRemove.removeAt(index);
      }
    }
  }

}